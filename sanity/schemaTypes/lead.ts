import { defineType, defineField } from "sanity";

export const leadType = defineType({
  name:  "lead",
  title: "Customer Lead",
  type:  "document",

  fields: [
    // ── STATUS (pipeline) ────────────────────────────────────────────
    defineField({
      name:        "status",
      title:       "Pipeline Stage",
      type:        "string",
      description: "Move the customer through the pipeline as you progress.",
      options: {
        list: [
          { title: "🆕  New Lead",               value: "new"        },
          { title: "📞  Contacted",               value: "contacted"  },
          { title: "🚗  Test Drive Scheduled",    value: "testdrive"  },
          { title: "💬  Offer / Negotiating",     value: "offer"      },
          { title: "✅  Sold — Deal Closed",      value: "sold"       },
          { title: "❌  Lost — Not Interested",   value: "lost"       },
        ],
        layout: "radio",
      },
      initialValue: "new",
      validation: R => R.required(),
    }),

    // ── CUSTOMER INFO ────────────────────────────────────────────────
    defineField({
      name:       "customerName",
      title:      "Customer Name",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:  "phone",
      title: "Phone Number",
      type:  "string",
    }),
    defineField({
      name:  "email",
      title: "Email Address",
      type:  "string",
    }),

    // ── VEHICLE INTEREST ─────────────────────────────────────────────
    defineField({
      name:        "interestedIn",
      title:       "Interested In (Vehicle)",
      type:        "reference",
      to:          [{ type: "vehicle" }],
      description: "Link to the specific car they are looking at.",
    }),
    defineField({
      name:        "budget",
      title:       "Budget (USD)",
      type:        "number",
      description: "Customer's stated budget",
    }),

    // ── SOURCE ───────────────────────────────────────────────────────
    defineField({
      name:  "source",
      title: "How Did They Find Us?",
      type:  "string",
      options: {
        list: [
          "Website",
          "Phone Call",
          "Walk-in",
          "Referral",
          "Facebook / Instagram",
          "Google Search",
          "Other",
        ],
      },
    }),

    // ── FOLLOW UP ────────────────────────────────────────────────────
    defineField({
      name:        "followUpDate",
      title:       "Follow Up Date",
      type:        "date",
      description: "When to contact this customer next",
    }),

    // ── NOTES ────────────────────────────────────────────────────────
    defineField({
      name:  "notes",
      title: "Notes",
      type:  "text",
      rows:  5,
      description: "Any details about the conversation, customer preferences, special requests, etc.",
    }),

    // ── OUTCOME (filled when closed) ─────────────────────────────────
    defineField({
      name:        "closedDate",
      title:       "Date Closed",
      type:        "date",
      hidden:      ({ document }) => !["sold","lost"].includes(document?.status as string),
      description: "When the deal was closed (won or lost)",
    }),
    defineField({
      name:        "lostReason",
      title:       "Reason Lost",
      type:        "string",
      hidden:      ({ document }) => document?.status !== "lost",
      options: {
        list: [
          "Price too high",
          "Bought elsewhere",
          "Changed mind",
          "Financing fell through",
          "No response",
          "Other",
        ],
      },
    }),
  ],

  preview: {
    select: {
      name:   "customerName",
      status: "status",
      make:   "interestedIn.make",
      model:  "interestedIn.model",
      phone:  "phone",
      date:   "followUpDate",
    },
    prepare({ name, status, make, model, phone, date }) {
      const icons: Record<string, string> = {
        new: "🆕", contacted: "📞", testdrive: "🚗",
        offer: "💬", sold: "✅", lost: "❌",
      };
      const vehicle = make ? `${make} ${model}` : "No vehicle linked";
      const sub = [icons[status] ?? "", vehicle, date ? `📅 ${date}` : phone ?? ""]
        .filter(Boolean).join("  ·  ");
      return {
        title:    name || "Unknown Customer",
        subtitle: sub,
      };
    },
  },

  orderings: [
    { title: "Newest First",    name: "createdDesc", by: [{ field: "_createdAt",  direction: "desc" }] },
    { title: "Follow Up Date",  name: "followUp",    by: [{ field: "followUpDate",direction: "asc"  }] },
  ],
});
