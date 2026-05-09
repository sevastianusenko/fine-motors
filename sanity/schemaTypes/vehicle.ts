import { defineType, defineField } from "sanity";

export const vehicleType = defineType({
  name:  "vehicle",
  title: "Vehicle",
  type:  "document",

  fields: [
    // ── STATUS ──────────────────────────────────────────────────────
    defineField({
      name:        "status",
      title:       "Status",
      type:        "string",
      description: "Available = shown on website. Sold = hidden from website.",
      options: {
        list: [
          { title: "✅  Available — show on website", value: "available" },
          { title: "🔴  Sold — hide from website",    value: "sold"      },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (R) => R.required(),
    }),

    // ── MAIN PHOTO ───────────────────────────────────────────────────
    defineField({
      name:        "mainImage",
      title:       "Main Photo",
      type:        "image",
      description: "Primary photo shown on the inventory card. Upload the best angle.",
      options:     { hotspot: true },
      validation:  (R) => R.required().error("Please upload at least one photo"),
    }),

    // ── BASIC INFO ───────────────────────────────────────────────────
    defineField({
      name:       "year",
      title:      "Year",
      type:       "number",
      validation: (R) =>
        R.required()
          .min(1990)
          .max(new Date().getFullYear() + 1)
          .integer(),
    }),
    defineField({
      name:        "make",
      title:       "Make (Brand)",
      type:        "string",
      description: "e.g. Toyota, Honda, Ford, Subaru",
      validation:  (R) => R.required(),
    }),
    defineField({
      name:        "model",
      title:       "Model & Trim",
      type:        "string",
      description: "e.g. RAV4 XLE AWD, CR-V EX-L, F-150 XLT 4WD",
      validation:  (R) => R.required(),
    }),

    // ── PRICE & MILEAGE ──────────────────────────────────────────────
    defineField({
      name:        "price",
      title:       "Asking Price (USD)",
      type:        "number",
      description: "Enter the price in dollars — no commas, just the number",
      validation:  (R) => R.required().positive().integer(),
    }),
    defineField({
      name:        "miles",
      title:       "Mileage (miles)",
      type:        "number",
      description: "Total miles shown on the odometer",
      validation:  (R) => R.required().positive().integer(),
    }),

    // ── BODY TYPE ────────────────────────────────────────────────────
    defineField({
      name:  "body",
      title: "Body Type",
      type:  "string",
      options: {
        list: [
          "Sedan",
          "SUV",
          "Truck",
          "Crossover",
          "Coupe",
          "Van",
          "Convertible",
        ],
      },
      validation: (R) => R.required(),
    }),

    // ── BADGE ────────────────────────────────────────────────────────
    defineField({
      name:        "badge",
      title:       "Badge Label (optional)",
      type:        "string",
      description: "Small highlighted label shown on the car photo",
      options: {
        list: [
          { title: "⭐  Best Value",  value: "Best Value"  },
          { title: "🔥  Popular",     value: "Popular"     },
          { title: "📉  Low Miles",   value: "Low Miles"   },
          { title: "🆕  New Arrival", value: "New Arrival" },
          { title: "💰  Price Drop",  value: "Price Drop"  },
        ],
      },
    }),

    // ── DRIVETRAIN & FUEL ────────────────────────────────────────────
    defineField({
      name:  "fuel",
      title: "Fuel Type",
      type:  "string",
      options: {
        list: [
          { title: "⛽ Gas",              value: "Gas"            },
          { title: "🔋 Hybrid",           value: "Hybrid"         },
          { title: "🔌 Plug-in Hybrid",   value: "Plug-in Hybrid" },
          { title: "⚡ Electric",          value: "Electric"       },
          { title: "🛢️ Diesel",           value: "Diesel"         },
        ],
        layout: "radio",
      },
      initialValue: "Gas",
    }),
    defineField({
      name:  "drivetrain",
      title: "Drivetrain",
      type:  "string",
      options: {
        list: [
          { title: "AWD — All-Wheel Drive",   value: "AWD" },
          { title: "4WD — Four-Wheel Drive",  value: "4WD" },
          { title: "FWD — Front-Wheel Drive", value: "FWD" },
          { title: "RWD — Rear-Wheel Drive",  value: "RWD" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name:  "transmission",
      title: "Transmission",
      type:  "string",
      options: {
        list: ["Automatic", "Manual", "CVT"],
        layout: "radio",
      },
      initialValue: "Automatic",
    }),
    defineField({
      name:        "engine",
      title:       "Engine (optional)",
      type:        "string",
      description: "e.g. 2.5L 4-cylinder, 3.5L V6, 2.0T Turbocharged",
    }),

    // ── COLORS ───────────────────────────────────────────────────────
    defineField({
      name:        "exteriorColor",
      title:       "Exterior Color (optional)",
      type:        "string",
      description: "e.g. Pearl White, Midnight Black, Graphite Gray",
    }),
    defineField({
      name:        "interiorColor",
      title:       "Interior Color (optional)",
      type:        "string",
      description: "e.g. Black Leather, Beige Cloth",
    }),

    // ── ACCIDENT HISTORY ─────────────────────────────────────────────
    defineField({
      name:  "accidents",
      title: "Accident History",
      type:  "string",
      options: {
        list: [
          { title: "✅ No accidents reported",  value: "none"     },
          { title: "⚠️ 1 accident reported",    value: "one"      },
          { title: "⚠️ Multiple accidents",     value: "multiple" },
          { title: "❓ Unknown",                value: "unknown"  },
        ],
        layout: "radio",
      },
      initialValue: "none",
    }),

    // ── VIN ──────────────────────────────────────────────────────────
    defineField({
      name:        "vin",
      title:       "VIN (optional)",
      type:        "string",
      description: "Vehicle Identification Number — 17 characters",
    }),

    // ── EXTRA PHOTOS ─────────────────────────────────────────────────
    defineField({
      name:  "gallery",
      title: "Additional Photos (optional)",
      type:  "array",
      of:    [{ type: "image", options: { hotspot: true } }],
    }),

    // ── DESCRIPTION ──────────────────────────────────────────────────
    defineField({
      name:        "description",
      title:       "Description (optional)",
      type:        "text",
      rows:        4,
      description: "Condition, service history, notable features, accident-free, etc.",
    }),

    // ── FEATURES ─────────────────────────────────────────────────────
    defineField({
      name:        "features",
      title:       "Key Features (optional)",
      type:        "array",
      description: 'Type a feature and press Enter. e.g. Sunroof, Backup Camera, Heated Seats',
      of:          [{ type: "string" }],
      options:     { layout: "tags" },
    }),
  ],

  // ── PREVIEW ───────────────────────────────────────────────────────
  preview: {
    select: {
      make:   "make",
      model:  "model",
      year:   "year",
      price:  "price",
      status: "status",
      media:  "mainImage",
    },
    prepare({ make, model, year, price, status, media }) {
      const icon  = status === "sold" ? "🔴" : "✅";
      const label = status === "sold" ? "Sold" : "Available";
      const p     = price ? `$${Number(price).toLocaleString("en-US")}` : "—";
      return {
        title:    `${year ?? ""} ${make ?? ""} ${model ?? ""}`.trim() || "New Vehicle",
        subtitle: `${p}  ·  ${icon} ${label}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name:  "createdDesc",
      by:    [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Price: High to Low",
      name:  "priceDesc",
      by:    [{ field: "price", direction: "desc" }],
    },
    {
      title: "Price: Low to High",
      name:  "priceAsc",
      by:    [{ field: "price", direction: "asc" }],
    },
  ],
});
