import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name:    "fine-motors",
  title:   "Fine Motors — Inventory Manager",
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Fine Motors LLC")
          .items([
            S.listItem()
              .title("✅ Available Cars")
              .child(
                S.documentList()
                  .title("Available Cars")
                  .filter('_type == "vehicle" && status == "available"')
              ),
            S.listItem()
              .title("🔴 Sold Cars")
              .child(
                S.documentList()
                  .title("Sold Cars")
                  .filter('_type == "vehicle" && status == "sold"')
              ),
            S.divider(),
            S.listItem()
              .title("All Cars")
              .child(
                S.documentList()
                  .title("All Cars")
                  .filter('_type == "vehicle"')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
