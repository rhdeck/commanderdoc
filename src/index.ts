import { join } from "path";

export function getOptions(options: any[]) {
  return options.filter(Boolean).map(getOption);
}
function getOption(o: { [key: string]: any }) {
  const {
    flags,
    required,
    optional,
    mandatory,
    variadic,
    short,
    long,
    negate,
    description,
    defaultValue,
    args,
  } = o;
  return {
    flags,
    required,
    optional,
    mandatory,
    variadic,
    short,
    long,
    negate,
    description,
    defaultValue,
    args,
  };
}
type OptionType = ReturnType<typeof getOption>;
type CommandType = {
  name: string;
  description?: string;
  options?: OptionType[];
  commands?: CommandType[];
  args?: { required: boolean; name: string; variadic: boolean }[];
};
export function getCommands(commands: { [key: string]: any }[]): CommandType[] {
  return commands.filter(Boolean).map(getCommand);
}
export function getCommand(o: { [key: string]: any }): CommandType {
  const {
    _args: args,
    _name: name,
    _description: description,
    options,
    commands,
  } = o;
  return {
    name,
    args,
    description,
    options: options && getOptions(options),
    commands: commands && getCommands(commands),
  };
}
function padLevel(level: number) {
  return new Array(level).fill("#").join("");
}
function optionToMd(option: OptionType, startLevel: number = 1) {
  const { flags, description, defaultValue } = option;
  let lines: string[] = [];
  //markdown - start with header
  lines.push(
    `* ${flags.replace("<", "\\<`").replace(">", "`>")} ${description} ${
      defaultValue ? "(default: " + defaultValue.toString() : ""
    }`
  );
  return lines.join("\n");
}
export function commandToMd(command: CommandType, startLevel: number = 1) {
  const { options, description, name, commands, args } = command;
  let lines: string[] = [];
  lines.push(
    padLevel(startLevel) +
      " " +
      name +
      (args && !!args!.length
        ? " " +
          args!
            .map(({ required, name, variadic }) => {
              const pieces: string[] = [];
              pieces.push(required ? "\\<" : "[");
              pieces.push("`");
              if (variadic) pieces.push("...");
              pieces.push(name);
              pieces.push("`");
              pieces.push(required ? ">" : "]");
              return pieces.join("");
            })
            .join(" ")
        : "")
  );
  if (description) lines.push(description);
  if (options && !!options.filter(Boolean).length) {
    lines.push(padLevel(startLevel + 1) + " Options");
    lines.push(...options.filter(Boolean).map((option) => optionToMd(option)));
  }
  if (commands && commands.filter(Boolean).length) {
    lines.push(padLevel(startLevel + 1) + " Subcommands");
    lines.push(
      ...commands.map((command) => commandToMd(command, startLevel + 2))
    );
  }
  return lines.join("\n");
}
export function commanderToMd(
  c: { [key: string]: any },
  cliName: string,
  startLevel: number = 1
) {
  const inspectedCommander = getCommand(c);
  let lines: string[] = [];
  lines.push(padLevel(startLevel) + " Usage");
  lines.push("```bash");
  if (
    inspectedCommander.commands &&
    inspectedCommander.commands.filter(Boolean).length
  )
    lines.push(cliName + " [options] [command]");
  else lines.push(cliName + "[options]");
  lines.push("```");

  if (
    inspectedCommander.options &&
    inspectedCommander.options.filter(Boolean).length
  ) {
    lines.push(padLevel(startLevel) + " Options");
    lines.push(
      ...inspectedCommander.options.map((option) =>
        optionToMd(option, startLevel + 1)
      )
    );
  }
  if (
    inspectedCommander.commands &&
    inspectedCommander.commands.filter(Boolean).length
  ) {
    lines.push(padLevel(startLevel) + " Commands");
    lines.push(
      ...inspectedCommander.commands.map((command) =>
        commandToMd(command, startLevel + 1)
      )
    );
  } else lines.push(commandToMd(inspectedCommander, startLevel + 1));
  return lines.join("\n");
}
