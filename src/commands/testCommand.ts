import z from "zod";
import { createCommandGroup, createSubCommand } from "../command/commandGroup";
import { createCommand } from "../command/createCommand";
import { respond } from "../ai";

export const testCommand = createCommand(
  {
    name: "test",
    description: "simple test command",
    options: {
      question: {
        description: "Question",
        type: z.string().min(1),
      },
    },
  },
  async (inter) => {
    console.log("input: ", inter.input);
    const response = await respond(inter.input.question);
    inter.reply(response);
  },
);
