import z from "zod";
import { createCommand } from "../command/createCommand";
import { respond } from "../ai";
import { db } from "../db";
import { sites } from "../db/schema";
import { slugify } from "../utils/slugify";
import { saveSite } from "../services/fileService";

export const generateCommand = createCommand(
  {
    name: "generate",
    description: "Generate a website based on your idea",
    options: {
      name: {
        description: "Name for your website",
        type: z.string().min(1),
      },
      idea: {
        description: "Your website idea/description",
        type: z.string().min(1),
      },
    },
  },
  async (inter) => {
    const { name, idea } = inter.input;
    const slug = slugify(name);

    await inter.reply(`Generating website "${name}" based on your idea...`);

    try {
      const response = await respond(
        `Generate an HTML website with the following idea: ${idea}`,
      );
      
      // Extract HTML content between backticks if present
      const html = response.replace(/^```html\n?|\n?```$/g, '');
      
      // Basic HTML validation
      if (!html.includes('<html') || !html.includes('</html>')) {
        throw new Error('Invalid HTML generated');
      }
      
      await saveSite({ slug, html });

      // Save to database
      await db.insert(sites).values({
        name,
        slug,
        folder: slug,
      });

      await inter.editReply(
        `Generated website for "${name}"!\nView it at: ${process.env.SITE_URL}/${slug}`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        await inter.editReply(
          `Failed to generate website for "${name}": ${error.message}`,
        );
        return;
      } else {
        await inter.editReply(`Failed to generate website`);
      }
    }
  },
);
