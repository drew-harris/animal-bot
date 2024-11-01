import z from "zod";
import { createCommand } from "../command/createCommand";
import { respond } from "../ai";

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
    await inter.reply(`Generating website "${name}" based on your idea...`);
    
    try {
      const response = await respond(`Generate an HTML website with the following idea: ${idea}`);
      // TODO: Save HTML to file and return URL once file handling is implemented
      await inter.editReply(`Generated website for "${name}":\n${response}`);
    } catch (error) {
      await inter.editReply(`Failed to generate website: ${error.message}`);
    }
  },
);
