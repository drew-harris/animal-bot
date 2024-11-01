import { Command, OptionCommand } from ".";
import { testCommand } from "../commands/testCommand";

export const commandsList: Command<any>[] = [testCommand];

export const addCommand = <T>(command: OptionCommand<T>) => {
  commandsList.push(command);
};
