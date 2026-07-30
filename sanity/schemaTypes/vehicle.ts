import { defineType, defineField } from "sanity";
import { VinDecoderInput } from "../components/VinDecoderInput";

const EXTERIOR_COLORS = [
  { title: "Black",            value: "Black"            },
  { title: "White",            value: "White"            },
  { title: "White Pearl",      value: "White Pearl"      },
  { title: "Silver",           value: "Silver"           },
  { title: "Gray",             value: "Gray"             },
  { title: "Charcoal",         value: "Charcoal"         },
  { title: "Dark Gray",        value: "Dark Gray"        },
  { title: "Red",              value: "Red"              },
  { title: "Burgundy / Maroon",value: "Burgundy"         },
  { title: "Blue",             value: "Blue"             },
  { title: "Dark Blue / Navy", value: "Dark Blue"        },
  { title: "Light Blue",       value: "Light Blue"       },
  { title: "Green",            value: "Green"            },
  { title: "Dark Green",       value: "Dark Green"       },
  { title: "Brown",            value: "Brown"            },
  { title: "Beige / Champagne",value: "Beige"            },
  { title: "Gold / Bronze",    value: "Gold"             },
  { title: "Orange",           value: "Orange"           },
  { title: "Yellow",           value: "Yellow"           },
  { title: "Other / Two-Tone", value: "Other"            },
];

const INTERIOR_COLORS = [
  { title: "Black",         value: "Black"        },
  { title: "Dark Gray",     value: "Dark Gray"    },
  { title: "Gray",          value: "Gray"         },
  { title: "Beige / Tan",   value: "Beige"        },
  { title: "Cream / Ivory", value: "Cream"        },
  { title: "Brown",         value: "Brown"        },
  { title: "Red",           value: "Red"          },
  { title: "White",         value: "White"        },
  { title: "Two-Tone",      value: "Two-Tone"     },
];

const FEATURES_LIST = [
  // Safety
  { title: "Backup Camera",                value: "Backup Camera"                },
  { title: "Blind Spot Monitor",           value: "Blind Spot Monitor"           },
  { title: "Lane Departure Warning",       value: "Lane Departure Warning"       },
  { title: "Forward Collision Warning",    value: "Forward Collision Warning"    },
  { title: "Automatic Emergency Braking",  value: "Automatic Emergency Braking"  },
  { title: "Parking Sensors",              value: "Parking Sensors"              },
  { title: "Adaptive Cruise Control",      value: "Adaptive Cruise Control"      },
  { title: "Rear Cross-Traffic Alert",     value: "Rear Cross-Traffic Alert"     },
  // Technology
  { title: "Apple CarPlay",               value: "Apple CarPlay"               },
  { title: "Android Auto",               value: "Android Auto"               },
  { title: "Bluetooth",                  value: "Bluetooth"                  },
  { title: "Navigation System",          value: "Navigation System"          },
  { title: "USB Ports",                  value: "USB Ports"                  },
  { title: "Wireless Charging",          value: "Wireless Charging"          },
  { title: "Premium Sound System",       value: "Premium Sound System"       },
  { title: "Satellite Radio (SiriusXM)", value: "Satellite Radio"            },
  { title: "Wi-Fi Hotspot",             value: "Wi-Fi Hotspot"             },
  { title: "Digital Instrument Cluster", value: "Digital Instrument Cluster" },
  // Comfort & Convenience
  { title: "Heated Front Seats",         value: "Heated Front Seats"         },
  { title: "Heated Rear Seats",          value: "Heated Rear Seats"          },
  { title: "Ventilated / Cooled Seats",  value: "Cooled Seats"               },
  { title: "Leather Interior",           value: "Leather Interior"           },
  { title: "Sunroof / Moonroof",         value: "Sunroof"                    },
  { title: "Panoramic Sunroof",          value: "Panoramic Sunroof"          },
  { title: "Power Driver Seat",          value: "Power Driver Seat"          },
  { title: "Memory Seats",              value: "Memory Seats"              },
  { title: "Remote Start",              value: "Remote Start"              },
  { title: "Keyless Entry",             value: "Keyless Entry"             },
  { title: "Push Button Start",         value: "Push Button Start"         },
  { title: "Power Tailgate / Liftgate", value: "Power Tailgate"            },
  { title: "Power Sliding Door(s)",     value: "Power Sliding Door"        },
  { title: "Third Row Seating",         value: "Third Row Seating"         },
  { title: "Heated Steering Wheel",     value: "Heated Steering Wheel"     },
  // Exterior & Towing
  { title: "Alloy Wheels",             value: "Alloy Wheels"             },
  { title: "Roof Rails / Crossbars",   value: "Roof Rails"               },
  { title: "Running Boards",           value: "Running Boards"           },
  { title: "Tow Package / Trailer Hitch", value: "Tow Package"           },
  { title: "Bed Liner (Truck)",        value: "Bed Liner"                },
  { title: "Tonneau Cover (Truck)",    value: "Tonneau Cover"            },
];

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
      description:  "Available = on website with price. Pending = on website, marked as Sale Pending. Sold = on website as SOLD. Deleted = hidden (kept in records). Draft = not published.",
      options: {
        list: [
          { title: "✅  Available — show on website with price",         value: "available" },
          { title: "🟡  Pending — show on website as Sale Pending",      value: "pending"   },
          { title: "🔴  Sold — show on website as SOLD",                 value: "sold"      },
          { title: "🗑️  Deleted — hidden from website",                  value: "deleted"   },
          { title: "📝  Draft — not published yet",                      value: "draft"     },
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
      name:        "mainImage",
      title:       "Main Photo",
      type:        "image",
      description: "Best angle — shown on the inventory card and Facebook posts.",
      options:     { hotspot: true },
      validation:  (R) => R.required().error("Please upload at least one photo"),
      group:       "listing",
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
      name:        "kbbValue",
      title:       "KBB Value (USD) — optional",
      type:        "number",
      description: "Kelley Blue Book value if you know it. Adds a small blue \"KBB\" tag on the website. Leave empty — no tag is shown.",
      validation:  (R) => R.positive().integer(),
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
      name:        "badge",
      title:       "Badge Label (optional)",
      type:        "string",
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
          { title: "Sedan",         value: "Sedan"       },
          { title: "SUV",           value: "SUV"         },
          { title: "Truck",         value: "Truck"       },
          { title: "Crossover",     value: "Crossover"   },
          { title: "Coupe",         value: "Coupe"       },
          { title: "Van / Minivan", value: "Van"         },
          { title: "Convertible",   value: "Convertible" },
          { title: "Wagon",         value: "Wagon"       },
          { title: "Hatchback",     value: "Hatchback"   },
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
      options:     { list: EXTERIOR_COLORS },
      group:       "specs",
    }),

    defineField({
      name:    "interiorColor",
      title:   "Interior Color",
      type:    "string",
      options: { list: INTERIOR_COLORS },
      group:   "specs",
    }),

    defineField({
      name:        "features",
      title:       "Features & Options",
      type:        "array",
      description: "Check everything that applies. These appear on the website and in Facebook posts.",
      of:          [{ type: "string" }],
      options: {
        list:   FEATURES_LIST,
        layout: "grid",
      },
      group: "specs",
    }),

    // ════════════════════════════════════════════════════════════════
    // TAB 3 — HISTORY & CONDITION
    // ════════════════════════════════════════════════════════════════

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
          { title: "1 Owner",   value: "1"       },
          { title: "2 Owners",  value: "2"       },
          { title: "3+ Owners", value: "3"       },
          { title: "Unknown",   value: "unknown" },
        ],
        layout: "radio",
      },
      group: "history",
    }),

    defineField({
      name:         "keysCount",
      title:        "Number of Keys",
      type:         "string",
      options: {
        list: [
          { title: "2 Keys",  value: "2" },
          { title: "1 Key",   value: "1" },
          { title: "No Key",  value: "0" },
        ],
        layout: "radio",
      },
      initialValue: "2",
      group: "history",
    }),

    defineField({
      name:         "carfaxAvailable",
      title:        "CARFAX Report Available",
      type:         "boolean",
      description:  "Do you have a CARFAX report for this vehicle?",
      initialValue: false,
      group:        "history",
    }),

    defineField({
      name:         "serviceRecords",
      title:        "Service Records Available",
      type:         "boolean",
      description:  "Are maintenance/service records available for this vehicle?",
      initialValue: false,
      group:        "history",
    }),

    defineField({
      name:    "warrantyRemaining",
      title:   "Warranty",
      type:    "string",
      options: {
        list: [
          { title: "Factory warranty remaining", value: "factory"  },
          { title: "Extended warranty",          value: "extended" },
          { title: "No warranty",                value: "none"     },
        ],
        layout: "radio",
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
      rows:        6,
      description: "Condition, service history, notable features. Shown on website and Facebook posts. Line breaks are preserved.",
      group:       "desc",
    }),

    defineField({
      name:        "customFeatures",
      title:       "Additional Features (free text)",
      type:        "array",
      description: "Anything not in the Specs checklist — type and press Enter.",
      of:          [{ type: "string" }],
      options:     { layout: "tags" },
      group:       "desc",
    }),

    defineField({
      name:        "gallery",
      title:       "Additional Photos",
      type:        "array",
      description: "Drag & drop multiple photos at once, or click Add to select several files.",
      of:          [{ type: "image", options: { hotspot: true } }],
      options:     { layout: "grid" },
      group:       "desc",
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
          { title: "Excellent — like new",  value: "excellent" },
          { title: "Good — minor wear",     value: "good"      },
          { title: "Fair — visible wear",   value: "fair"      },
          { title: "Rough — needs work",    value: "rough"     },
        ],
        layout: "radio",
      },
      initialValue: "good",
      group:        "business",
    }),

    defineField({
      name:   "soldDate",
      title:  "Date Sold",
      type:   "date",
      hidden: ({ document }) => document?.status !== "sold",
      group:  "business",
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
      const icon  = status === "sold" ? "🔴" : status === "pending" ? "🟡" : "✅";
      const p     = price ? `$${Number(price).toLocaleString("en-US")}` : "—";
      const stock = stockNumber ? `  ·  #${stockNumber}` : "";

      let extra = "";
      if (status === "sold" && soldPrice && purchasePrice) {
        const profit = Number(soldPrice) - Number(purchasePrice);
        extra = `  ·  Profit: ${profit >= 0 ? "+" : ""}$${Math.abs(profit).toLocaleString("en-US")}`;
      }
      if (status === "sold" && soldDate) extra += `  ·  Sold ${soldDate}`;

      return {
        title:    `${year ?? ""} ${make ?? ""} ${model ?? ""}`.trim() || "New Vehicle",
        subtitle: `${p}${stock}  ·  ${icon} ${status === "sold" ? "Sold" : status === "pending" ? "Pending" : "Available"}${extra}`,
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
