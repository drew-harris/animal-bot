import z from "zod";
import { createCommand } from "../command/createCommand";
import { respond } from "../ai";
import { db } from "../db";
import { sites } from "../db/schema";

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
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    await inter.reply(`Generating website "${name}" based on your idea...`);

    try {
      const response = await respond(
        `Generate an HTML website with the following idea: ${idea}`,
      );
      // Save to database
      await db.insert(sites).values({
        name,
        slug,
        folder: `/sites/${slug}`, // We'll use this path later for file storage
      });
      
      await inter.editReply(`Generated website for "${name}" (${slug}):\n${response}`);
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
