import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool }    from "@sanity/vision";
import { schemaTypes }   from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name:    "fine-motors",
  title:   "Fine Motors LLC",
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Fine Motors LLC")
          .items([

            // ── INVENTORY ──────────────────────────────────────────
            S.listItem()
              .title("🚗  INVENTORY")
              .child(
                S.list()
                  .title("Inventory")
                  .items([
                    S.listItem()
                      .title("✅  Available Cars")
                      .schemaType("vehicle")
                      .child(
                        S.documentList()
                          .title("Available Cars")
                          .schemaType("vehicle")
                          .filter('_type == "vehicle" && status == "available"')
                          .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("🔴  Sold Cars")
                      .schemaType("vehicle")
                      .child(
                        S.documentList()
                          .title("Sold Cars")
                          .schemaType("vehicle")
                          .filter('_type == "vehicle" && status == "sold"')
                          .defaultOrdering([{ field: "soldDate", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("📝  Drafts")
                      .schemaType("vehicle")
                      .child(
                        S.documentList()
                          .title("Drafts")
                          .schemaType("vehicle")
                          .filter('_type == "vehicle" && status == "draft"')
                          .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("🗑️  Deleted")
                      .schemaType("vehicle")
                      .child(
                        S.documentList()
                          .title("Deleted Vehicles")
                          .schemaType("vehicle")
                          .filter('_type == "vehicle" && status == "deleted"')
                          .defaultOrdering([{ field: "_updatedAt", direction: "desc" }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title("📋  All Vehicles")
                      .schemaType("vehicle")
                      .child(
                        S.documentList()
                          .title("All Vehicles")
                          .schemaType("vehicle")
                          .filter('_type == "vehicle"')
                      ),
                    S.listItem()
                      .title("➕  Add New Vehicle")
                      .schemaType("vehicle")
                      .child(S.documentTypeList("vehicle").title("Add New Vehicle")),
                  ])
              ),

            S.divider(),

            // ── CUSTOMER LEADS / CRM ───────────────────────────────
            S.listItem()
              .title("👥  CUSTOMER LEADS")
              .child(
                S.list()
                  .title("Customer Leads")
                  .items([
                    S.listItem()
                      .title("🆕  New Leads")
                      .schemaType("lead")
                      .child(
                        S.documentList()
                          .title("New Leads")
                          .schemaType("lead")
                          .filter('_type == "lead" && status == "new"')
                          .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("📞  Contacted")
                      .schemaType("lead")
                      .child(
                        S.documentList()
                          .title("Contacted")
                          .schemaType("lead")
                          .filter('_type == "lead" && status == "contacted"')
                      ),
                    S.listItem()
                      .title("🚗  Test Drive")
                      .schemaType("lead")
                      .child(
                        S.documentList()
                          .title("Test Drive Scheduled")
                          .schemaType("lead")
                          .filter('_type == "lead" && status == "testdrive"')
                      ),
                    S.listItem()
                      .title("💬  Offer / Negotiating")
                      .schemaType("lead")
                      .child(
                        S.documentList()
                          .title("Offer / Negotiating")
                          .schemaType("lead")
                          .filter('_type == "lead" && status == "offer"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title("✅  Closed — Won")
                      .schemaType("lead")
                      .child(
                        S.documentList()
                          .title("Closed — Won")
                          .schemaType("lead")
                          .filter('_type == "lead" && status == "sold"')
                          .defaultOrdering([{ field: "closedDate", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("❌  Closed — Lost")
                      .schemaType("lead")
                      .child(
                        S.documentList()
                          .title("Closed — Lost")
                          .schemaType("lead")
                          .filter('_type == "lead" && status == "lost"')
                      ),
                    S.divider(),
                    S.listItem()
                      .title("📁  All Leads")
                      .schemaType("lead")
                      .child(
                        S.documentList()
                          .title("All Leads")
                          .schemaType("lead")
                          .filter('_type == "lead"')
                          .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("➕  Add New Lead")
                      .schemaType("lead")
                      .child(S.documentTypeList("lead").title("Add New Lead")),
                  ])
              ),
          ]),
    }),

    visionTool(),
  ],

  schema: { types: schemaTypes },
});
