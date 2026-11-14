// One-off: give every existing vehicle a readable slug.
// Run:  node --env-file=.env.local scripts/backfill-slugs.mjs [--apply]
import { createClient } from "@sanity/client";

const APPLY = process.argv.includes("--apply");

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_TOKEN,
  useCdn:     false,
});

const slugify = (input) =>
  String(input).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

const docs = await client.fetch(
  `*[_type == "vehicle"]{ _id, year, make, model, stockNumber, status, "slug": slug.current }`,
);

// drafts.<id> and <id> are the same vehicle — one slug for both
const baseId = (id) => id.replace(/^drafts\./, "");
const taken  = new Set(docs.map((d) => d.slug).filter(Boolean));
const chosen = new Map();

for (const d of docs) {
  if (d.slug) { chosen.set(baseId(d._id), d.slug); continue; }
  if (chosen.has(baseId(d._id))) continue;

  const base = slugify([d.year, d.make, d.model].filter(Boolean).join(" ")) || baseId(d._id);
  let value = base;
  for (let i = 2; taken.has(value); i++) {
    value = d.stockNumber ? `${base}-${slugify(d.stockNumber)}` : `${base}-${i}`;
    if (d.stockNumber && taken.has(value)) value = `${base}-${i}`;
  }
  taken.add(value);
  chosen.set(baseId(d._id), value);
}

const todo = docs.filter((d) => !d.slug);
console.log(`${docs.length} vehicles, ${todo.length} without a slug\n`);
for (const d of todo) {
  console.log(`  ${d._id}\n    -> /inventory/${chosen.get(baseId(d._id))}   [${d.status ?? "?"}]`);
}

if (!APPLY) { console.log("\nDry run. Re-run with --apply to write."); process.exit(0); }

let tx = client.transaction();
for (const d of todo) {
  tx = tx.patch(d._id, { set: { slug: { _type: "slug", current: chosen.get(baseId(d._id)) } } });
}
if (todo.length) { await tx.commit(); console.log(`\nWrote ${todo.length} slugs.`); }
else console.log("\nNothing to write.");
