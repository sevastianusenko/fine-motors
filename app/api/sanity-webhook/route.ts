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
  if (price)           text += `💰 Price: ${price}\n`;
  if (miles)           text += `📍 Mileage: ${miles}\n`;
  if (v.fuel && v.fuel !== "Gas") text += `⚡ Fuel: ${v.fuel}\n`;
  if (v.drivetrain)    text += `🔧 Drivetrain: ${v.drivetrain}\n`;
  if (v.transmission && v.transmission !== "Automatic") text += `⚙️ Transmission: ${v.transmission}\n`;
  if (v.exteriorColor) text += `🎨 Color: ${v.exteriorColor}\n`;
  if (v.ownersCount && v.ownersCount !== "unknown") text += `👤 ${v.ownersCount} Owner${v.ownersCount === "1" ? "" : "s"}\n`;
  if (v.accidents === "none") text += `✅ No accidents reported\n`;
  if (v.titleStatus === "clean") text += `📄 Clean Title\n`;
  if (v.carfaxAvailable) text += `📊 CARFAX Available\n`;

  if (v.description) text += `\n${v.description}\n`;

  const featureList = [
    ...(Array.isArray(v.features)       ? (v.features       as string[]) : []),
    ...(Array.isArray(v.customFeatures) ? (v.customFeatures as string[]) : []),
  ];
  if (featureList.length > 0) {
    text += `\n✅ ${featureList.slice(0, 6).join("  •  ")}\n`;
  }

  text += `\n📞 Call or message us to schedule a test drive!`;

  if (SITE_URL && v._id) {
    text += `\n🌐 ${SITE_URL}/inventory/${v._id}`;
  }

  return text;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const rawBody = await req.text();
  console.log("[sanity-webhook] Received payload:", rawBody.slice(0, 500));

  // Validate signature only if Sanity sends one (secret configured on both sides)
  if (WEBHOOK_SECRET) {
    const sig = req.headers.get("sanity-webhook-signature");
    if (sig && !isValidSignature(rawBody, sig, WEBHOOK_SECRET)) {
      console.error("[sanity-webhook] Invalid signature. Header:", sig);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  // Sanity can send {after: {...}} or the document directly
  const vehicle = (parsed.after ?? parsed) as Record<string, unknown>;

  console.log("[sanity-webhook] _type:", vehicle._type, "status:", vehicle.status);

  // Only post for available vehicles
  if (vehicle._type !== "vehicle" || vehicle.status !== "available") {
    return NextResponse.json({ skipped: true, reason: `_type=${vehicle._type} status=${vehicle.status}` });
  }

  const imageRef = (vehicle.mainImage as Record<string, unknown> | undefined)?.asset as Record<string, unknown> | undefined;
  const ref = imageRef?._ref as string | undefined;
  if (!ref) {
    console.error("[sanity-webhook] No mainImage ref. mainImage:", JSON.stringify(vehicle.mainImage));
    return NextResponse.json({ error: "Vehicle has no main image", mainImage: vehicle.mainImage }, { status: 400 });
  }

  const imageUrl = sanityImageUrl(ref);
  const message  = buildPostText(vehicle);
  console.log("[sanity-webhook] Posting to Facebook. imageUrl:", imageUrl);

  const fbRes = await fetch(
    `https://graph.facebook.com/v20.0/${FB_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: FB_TOKEN, url: imageUrl, message }),
    }
  );

  const fbData = await fbRes.json();
  if (!fbRes.ok) {
    console.error("[sanity-webhook] Facebook API error:", JSON.stringify(fbData));
    return NextResponse.json({ error: fbData }, { status: 502 });
  }

  console.log("[sanity-webhook] Posted to Facebook:", (fbData as { id: string }).id);
  return NextResponse.json({ success: true, fbPostId: (fbData as { id: string }).id });
}
