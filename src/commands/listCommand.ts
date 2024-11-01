import { createCommand } from "../command/createCommand";
import { db } from "../db";
import { sites } from "../db/schema";

export const listCommand = createCommand(
  {
    name: "list",
    description: "List all generated websites",
  },
  async (inter) => {
    await inter.deferReply();

    try {
      const allSites = await db.select().from(sites);

      if (allSites.length === 0) {
        await inter.editReply("No websites have been generated yet!");
        return;
      }

      const sitesList = allSites
        .map((site) => `- ${site.name} (${site.slug})`)
        .join("\n");

      await inter.editReply(`Generated websites:\n${sitesList}`);
    } catch (error) {
      console.error("Failed to list websites:", error);
      await inter.editReply("Failed to retrieve the list of websites");
    }
  },
);
