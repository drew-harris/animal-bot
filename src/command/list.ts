import { Command, OptionCommand } from ".";
import { generateCommand } from "../commands/generateCommand";
import { testCommand } from "../commands/testCommand";

export const commandsList: Command<any>[] = [testCommand, generateCommand];

export const addCommand = <T>(command: OptionCommand<T>) => {
  commandsList.push(command);
};
