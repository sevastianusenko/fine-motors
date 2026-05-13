import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const FB_PAGE_ID    = process.env.FACEBOOK_PAGE_ID!;
const FB_TOKEN      = process.env.FACEBOOK_PAGE_ACCESS_TOKEN!;
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
const PROJECT_ID    = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const DATASET       = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const SITE_URL      = process.env.NEXT_PUBLIC_SITE_URL ?? "";

// Sanity image ref → CDN URL
// ref format: "image-{assetId}-{WxH}-{ext}"
function sanityImageUrl(ref: string): string {
  const without = ref.replace(/^image-/, "");
  const lastDash = without.lastIndexOf("-");
  const ext = without.slice(lastDash + 1);
  const body = without.slice(0, lastDash);
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${body}.${ext}`;
}

// Validate Sanity HMAC-SHA256 signature
// Header: "t={timestamp},v1={hex-signature}"
function isValidSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t  = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(`${t}.${rawBody}`);
  const expected = hmac.digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(v1, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

function buildPostText(v: Record<string, unknown>): string {
  const price = v.price ? `$${Number(v.price).toLocaleString("en-US")}` : null;
  const miles = v.miles ? `${Number(v.miles).toLocaleString("en-US")} mi` : null;

  let text = `🚗 NEW ARRIVAL: ${v.year ?? ""} ${v.make ?? ""} ${v.model ?? ""}`.trim() + "\n\n";
  if (price)        text += `💰 Price: ${price}\n`;
  if (miles)        text += `📍 Mileage: ${miles}\n`;
  if (v.fuel && v.fuel !== "Gas") text += `⚡ ${v.fuel}\n`;
  if (v.drivetrain) text += `🔧 ${v.drivetrain}\n`;
  if (v.exteriorColor) text += `🎨 ${v.exteriorColor}\n`;
  if (v.description) text += `\n${v.description}\n`;

  const featureList = Array.isArray(v.features) ? (v.features as string[]) : [];
  if (featureList.length > 0) {
    text += `\n✅ ${featureList.slice(0, 5).join("  •  ")}\n`;
  }

  text += `\n📞 Call or message us to schedule a test drive!`;

  if (SITE_URL && v._id) {
    text += `\n🌐 ${SITE_URL}/inventory/${v._id}`;
  }

  return text;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const rawBody = await req.text();

  // Validate signature if a secret is configured
  if (WEBHOOK_SECRET) {
    const sig = req.headers.get("sanity-webhook-signature");
    if (!isValidSignature(rawBody, sig, WEBHOOK_SECRET)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let vehicle: Record<string, unknown>;
  try {
    vehicle = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  // Only post for available vehicles
  if (vehicle._type !== "vehicle" || vehicle.status !== "available") {
    return NextResponse.json({ skipped: true, reason: "not an available vehicle" });
  }

  const imageRef = (vehicle.mainImage as Record<string, unknown> | undefined)?.asset as Record<string, unknown> | undefined;
  const ref = imageRef?._ref as string | undefined;
  if (!ref) {
    return NextResponse.json({ error: "Vehicle has no main image" }, { status: 400 });
  }

  const imageUrl = sanityImageUrl(ref);
  const message  = buildPostText(vehicle);

  const fbRes = await fetch(
    `https://graph.facebook.com/v20.0/${FB_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: FB_TOKEN, url: imageUrl, message }),
    }
  );

  if (!fbRes.ok) {
    const err = await fbRes.json();
    console.error("[sanity-webhook] Facebook API error:", err);
    return NextResponse.json({ error: err }, { status: 502 });
  }

  const result = await fbRes.json() as { id: string };
  console.log("[sanity-webhook] Posted to Facebook:", result.id);
  return NextResponse.json({ success: true, fbPostId: result.id });
}
