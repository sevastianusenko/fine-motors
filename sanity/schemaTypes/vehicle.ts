import { defineType, defineField } from "sanity";
import { VinDecoderInput } from "../components/VinDecoderInput";

export const vehicleType = defineType({
  name:  "vehicle",
  title: "Vehicle",
  type:  "document",

  groups: [
    { name: "listing",  title: "📋 Listing",     default: true },
    { name: "specs",    title: "🔧 Specs"                      },
    { name: "history",  title: "📋 History"                    },
    { name: "desc",     title: "📝 Description"                },
    { name: "business", title: "🔒 Business"                   },
  ],

  fields: [

    // ════════════════════════════════════════════════════════════════
    // TAB 1 — LISTING
    // ════════════════════════════════════════════════════════════════

    defineField({
      name:        "vin",
      title:       "VIN — Enter to Auto-Fill All Fields",
      type:        "string",
      description: "Enter the 17-character VIN and click Decode. Year, Make, Model, Fuel, Drivetrain, and more will fill automatically.",
      components:  { input: VinDecoderInput },
      group:       "listing",
    }),

    defineField({
      name:         "status",
      title:        "Status",
      type:         "string",
      description:  "Available = shown on website. Sold = hidden from website.",
      options: {
        list: [
          { title: "✅  Available — show on website", value: "available" },
          { title: "🔴  Sold — hide from website",    value: "sold"      },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation:   (R) => R.required(),
      group:        "listing",
    }),

    defineField({
      name:        "stockNumber",
      title:       "Stock Number",
      type:        "string",
      description: "Your internal stock # for this vehicle. e.g. FM-2024-047",
      group:       "listing",
    }),

    defineField({
      name:       "mainImage",
      title:      "Main Photo",
      type:       "image",
      description: "Best angle — this is the photo shown on the inventory card and Facebook posts.",
      options:    { hotspot: true },
      validation: (R) => R.required().error("Please upload at least one photo"),
      group:      "listing",
    }),

    defineField({
      name:       "year",
      title:      "Year",
      type:       "number",
      validation: (R) =>
        R.required().min(1990).max(new Date().getFullYear() + 1).integer(),
      group: "listing",
    }),

    defineField({
      name:        "make",
      title:       "Make (Brand)",
      type:        "string",
      description: "e.g. Toyota, Honda, Ford, Chevrolet",
      validation:  (R) => R.required(),
      group:       "listing",
    }),

    defineField({
      name:        "model",
      title:       "Model & Trim",
      type:        "string",
      description: "e.g. RAV4 XLE AWD, CR-V EX-L, F-150 XLT 4WD",
      validation:  (R) => R.required(),
      group:       "listing",
    }),

    defineField({
      name:        "price",
      title:       "Asking Price (USD)",
      type:        "number",
      description: "Numbers only — no commas. e.g. 18500",
      validation:  (R) => R.required().positive().integer(),
      group:       "listing",
    }),

    defineField({
      name:        "miles",
      title:       "Mileage (miles)",
      type:        "number",
      description: "Odometer reading. e.g. 42000",
      validation:  (R) => R.required().positive().integer(),
      group:       "listing",
    }),

    defineField({
      name:    "badge",
      title:   "Badge Label (optional)",
      type:    "string",
      description: "Small highlighted label shown on the vehicle photo card.",
      options: {
        list: [
          { title: "⭐  Best Value",  value: "Best Value"  },
          { title: "🔥  Popular",     value: "Popular"     },
          { title: "📉  Low Miles",   value: "Low Miles"   },
          { title: "🆕  New Arrival", value: "New Arrival" },
          { title: "💰  Price Drop",  value: "Price Drop"  },
        ],
      },
      group: "listing",
    }),

    // ════════════════════════════════════════════════════════════════
    // TAB 2 — SPECS
    // ════════════════════════════════════════════════════════════════

    defineField({
      name:       "body",
      title:      "Body Style",
      type:       "string",
      options: {
        list: [
          { title: "Sedan",       value: "Sedan"       },
          { title: "SUV",         value: "SUV"         },
          { title: "Truck",       value: "Truck"       },
          { title: "Crossover",   value: "Crossover"   },
          { title: "Coupe",       value: "Coupe"       },
          { title: "Van / Minivan", value: "Van"       },
          { title: "Convertible", value: "Convertible" },
          { title: "Wagon",       value: "Wagon"       },
          { title: "Hatchback",   value: "Hatchback"   },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
      group: "specs",
    }),

    defineField({
      name:         "fuel",
      title:        "Fuel Type",
      type:         "string",
      options: {
        list: [
          { title: "Gas",            value: "Gas"            },
          { title: "Hybrid",         value: "Hybrid"         },
          { title: "Plug-in Hybrid", value: "Plug-in Hybrid" },
          { title: "Electric",       value: "Electric"       },
          { title: "Diesel",         value: "Diesel"         },
          { title: "Flex Fuel",      value: "Flex Fuel"      },
        ],
        layout: "radio",
      },
      initialValue: "Gas",
      group: "specs",
    }),

    defineField({
      name:    "drivetrain",
      title:   "Drivetrain",
      type:    "string",
      options: {
        list: [
          { title: "AWD — All-Wheel Drive",   value: "AWD" },
          { title: "4WD — Four-Wheel Drive",  value: "4WD" },
          { title: "FWD — Front-Wheel Drive", value: "FWD" },
          { title: "RWD — Rear-Wheel Drive",  value: "RWD" },
        ],
        layout: "radio",
      },
      group: "specs",
    }),

    defineField({
      name:         "transmission",
      title:        "Transmission",
      type:         "string",
      options: {
        list: [
          { title: "Automatic", value: "Automatic" },
          { title: "Manual",    value: "Manual"    },
          { title: "CVT",       value: "CVT"       },
        ],
        layout: "radio",
      },
      initialValue: "Automatic",
      group: "specs",
    }),

    defineField({
      name:        "engine",
      title:       "Engine (optional)",
      type:        "string",
      description: "e.g. 2.5L 4-cylinder, 3.5L V6, 2.0T Turbocharged",
      group:       "specs",
    }),

    defineField({
      name:        "exteriorColor",
      title:       "Exterior Color",
      type:        "string",
      description: "e.g. Pearl White, Midnight Black, Graphite Gray",
      group:       "specs",
    }),

    defineField({
      name:        "interiorColor",
      title:       "Interior Color",
      type:        "string",
      description: "e.g. Black Leather, Beige Cloth, Gray Cloth",
      group:       "specs",
    }),

    // ════════════════════════════════════════════════════════════════
    // TAB 3 — HISTORY & CONDITION
    // ════════════════════════════════════════════════════════════════

    defineField({
      name:         "accidents",
      title:        "Accident History",
      type:         "string",
      options: {
        list: [
          { title: "No accidents reported",  value: "none"     },
          { title: "1 accident reported",    value: "one"      },
          { title: "Multiple accidents",     value: "multiple" },
          { title: "Unknown",                value: "unknown"  },
        ],
        layout: "radio",
      },
      initialValue: "none",
      group:        "history",
    }),

    defineField({
      name:         "titleStatus",
      title:        "Title Status",
      type:         "string",
      options: {
        list: [
          { title: "Clean Title",    value: "clean"    },
          { title: "Rebuilt Title",  value: "rebuilt"  },
          { title: "Salvage Title",  value: "salvage"  },
        ],
        layout: "radio",
      },
      initialValue: "clean",
      group:        "history",
    }),

    defineField({
      name:    "ownersCount",
      title:   "Number of Previous Owners",
      type:    "string",
      options: {
        list: [
          { title: "1 Owner",      value: "1" },
          { title: "2 Owners",     value: "2" },
          { title: "3+ Owners",    value: "3" },
          { title: "Unknown",      value: "unknown" },
        ],
        layout: "radio",
      },
      group: "history",
    }),

    defineField({
      name:    "keysCount",
      title:   "Number of Keys",
      type:    "string",
      options: {
        list: [
          { title: "2 Keys",    value: "2" },
          { title: "1 Key",     value: "1" },
          { title: "No Key",    value: "0" },
        ],
        layout: "radio",
      },
      initialValue: "2",
      group: "history",
    }),

    defineField({
      name:        "carfaxAvailable",
      title:       "CARFAX Report Available",
      type:        "boolean",
      description: "Do you have a CARFAX report for this vehicle?",
      initialValue: false,
      group:        "history",
    }),

    defineField({
      name:        "serviceRecords",
      title:       "Service Records Available",
      type:        "boolean",
      description: "Are maintenance/service records available for this vehicle?",
      initialValue: false,
      group:        "history",
    }),

    defineField({
      name:        "warrantyRemaining",
      title:       "Warranty",
      type:        "string",
      description: "e.g. Factory warranty until 2026, No warranty, Extended warranty available",
      options: {
        list: [
          { title: "Factory warranty remaining", value: "factory"  },
          { title: "Extended warranty",          value: "extended" },
          { title: "No warranty",                value: "none"     },
        ],
      },
      group: "history",
    }),

    // ════════════════════════════════════════════════════════════════
    // TAB 4 — DESCRIPTION
    // ════════════════════════════════════════════════════════════════

    defineField({
      name:        "description",
      title:       "Vehicle Description",
      type:        "text",
      rows:        5,
      description: "Condition, service history, notable features. Shown on website and Facebook posts.",
      group:       "desc",
    }),

    defineField({
      name:        "features",
      title:       "Key Features",
      type:        "array",
      description: "Type a feature and press Enter. e.g. Sunroof, Backup Camera, Heated Seats, Apple CarPlay",
      of:          [{ type: "string" }],
      options:     { layout: "tags" },
      group:       "desc",
    }),

    defineField({
      name:  "gallery",
      title: "Additional Photos",
      type:  "array",
      of:    [{ type: "image", options: { hotspot: true } }],
      group: "desc",
    }),

    // ════════════════════════════════════════════════════════════════
    // TAB 5 — BUSINESS (INTERNAL — NOT SHOWN ON WEBSITE)
    // ════════════════════════════════════════════════════════════════

    defineField({
      name:    "vehicleSource",
      title:   "Vehicle Source",
      type:    "string",
      options: {
        list: [
          { title: "Auction",        value: "Auction"        },
          { title: "Trade-in",       value: "Trade-in"       },
          { title: "Private Seller", value: "Private Seller" },
          { title: "Dealer",         value: "Dealer"         },
          { title: "Other",          value: "Other"          },
        ],
      },
      group: "business",
    }),

    defineField({
      name:        "purchasePrice",
      title:       "Purchase Price — What You Paid",
      type:        "number",
      description: "Your acquisition cost. Used to calculate profit. NOT shown on website.",
      group:       "business",
    }),

    defineField({
      name:  "purchaseDate",
      title: "Date Purchased",
      type:  "date",
      group: "business",
    }),

    defineField({
      name:         "condition",
      title:        "Condition Grade",
      type:         "string",
      description:  "Internal condition rating for your records.",
      options: {
        list: [
          { title: "Excellent — like new",      value: "excellent" },
          { title: "Good — minor wear",         value: "good"      },
          { title: "Fair — visible wear",       value: "fair"      },
          { title: "Rough — needs work",        value: "rough"     },
        ],
        layout: "radio",
      },
      initialValue: "good",
      group:        "business",
    }),

    defineField({
      name:        "soldDate",
      title:       "Date Sold",
      type:        "date",
      hidden:      ({ document }) => document?.status !== "sold",
      group:       "business",
    }),

    defineField({
      name:        "soldPrice",
      title:       "Final Sale Price",
      type:        "number",
      description: "Actual price sold for (may differ from asking price).",
      hidden:      ({ document }) => document?.status !== "sold",
      group:       "business",
    }),

    defineField({
      name:   "buyerName",
      title:  "Buyer Name",
      type:   "string",
      hidden: ({ document }) => document?.status !== "sold",
      group:  "business",
    }),

    defineField({
      name:        "internalNotes",
      title:       "Internal Notes",
      type:        "text",
      rows:        4,
      description: "Repairs done, issues to disclose, negotiation notes. NOT shown on website.",
      group:       "business",
    }),
  ],

  preview: {
    select: {
      make:          "make",
      model:         "model",
      year:          "year",
      price:         "price",
      status:        "status",
      media:         "mainImage",
      purchasePrice: "purchasePrice",
      soldPrice:     "soldPrice",
      soldDate:      "soldDate",
      stockNumber:   "stockNumber",
    },
    prepare({ make, model, year, price, status, media, purchasePrice, soldPrice, soldDate, stockNumber }) {
      const icon = status === "sold" ? "🔴" : "✅";
      const p    = price ? `$${Number(price).toLocaleString("en-US")}` : "—";
      const stock = stockNumber ? `  ·  #${stockNumber}` : "";

      let extra = "";
      if (status === "sold" && soldPrice && purchasePrice) {
        const profit = Number(soldPrice) - Number(purchasePrice);
        extra = `  ·  Profit: ${profit >= 0 ? "+" : ""}$${Math.abs(profit).toLocaleString("en-US")}`;
      }
      if (status === "sold" && soldDate) extra += `  ·  Sold ${soldDate}`;

      return {
        title:    `${year ?? ""} ${make ?? ""} ${model ?? ""}`.trim() || "New Vehicle",
        subtitle: `${p}${stock}  ·  ${icon} ${status === "sold" ? "Sold" : "Available"}${extra}`,
        media,
      };
    },
  },

  orderings: [
    { title: "Newest First",       name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
    { title: "Price: High to Low", name: "priceDesc",   by: [{ field: "price",      direction: "desc" }] },
    { title: "Price: Low to High", name: "priceAsc",    by: [{ field: "price",      direction: "asc"  }] },
  ],
});
