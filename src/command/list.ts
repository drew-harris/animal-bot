import { Command, OptionCommand } from ".";
import { generateCommand } from "../commands/generateCommand";
import { listCommand } from "../commands/listCommand";
import { testCommand } from "../commands/testCommand";

export const commandsList: Command<any>[] = [testCommand, generateCommand, listCommand];

export const addCommand = <T>(command: OptionCommand<T>) => {
  commandsList.push(command);
};
