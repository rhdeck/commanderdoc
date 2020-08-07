import commander from "commander";

/**
 * Get filtered map of attributes for a list of options
 * @param options Options for a command
 */
export function getOptions(options: any[]) {
  return options.filter(Boolean).map(getOption);
}
/** Get filtered list of attributes for a single options
 * @param option Option for a commands
 */
function getOption(option: { [key: string]: any }) {
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
  } = option;
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
/**
 * Recursively inspect a list of commands
 * @param commands List of commands to inspect (usually from `command.commands`)
 */
export function getCommands(commands: { [key: string]: any }[]): CommandType[] {
  return commands.filter(Boolean).map(getCommand);
}
/**
 * Generate a map of properties of a command object
 * @param command Commander command object to inspect
 */
export function getCommand(command: { [key: string]: any }): CommandType {
  const {
    _args: args,
    _name: name,
    _description: description,
    options,
    commands,
  } = command;
  return {
    name,
    args,
    description,
    options: options && getOptions(options),
    commands: commands && getCommands(commands),
  };
}
/**
 * Generate a markdown header prefix at the indicated level
 * @internal
 * @param level level of the markdown header padding
 */
function padLevel(level: number) {
  return new Array(level).fill("#").join("");
}
/** Generate markdown for a single commander option
 * @param option Option to generate markdown for
 */
function optionToMd(option: OptionType) {
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
/**
 * Convert an inspected command to a markdown string
 * @param command inspected command to inspect (result of getCommand(command))
 * @param startLevel header level to start with
 * @param parents list of parent commands and cli name to document usage
 */
export function commandToMd(
  command: CommandType,
  startLevel: number = 1,
  parents: string[] = []
) {
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
  lines.push(padLevel(startLevel + 1) + " Usage");
  lines.push("```bash");
  lines.push(
    [...parents, name].join(" ") +
      " [options]" +
      (args && !!args!.length
        ? " " +
          args!
            .map(({ required, name, variadic }) => {
              const pieces: string[] = [];
              pieces.push(required ? "<" : "[");
              if (variadic) pieces.push("...");
              pieces.push(name);
              pieces.push(required ? ">" : "]");
              return pieces.join("");
            })
            .join(" ")
        : "")
  );
  lines.push("```");
  if (options && !!options.filter(Boolean).length) {
    lines.push(padLevel(startLevel + 1) + " Options");
    lines.push(...options.filter(Boolean).map((option) => optionToMd(option)));
  }
  if (commands && commands.filter(Boolean).length) {
    lines.push(padLevel(startLevel + 1) + " Subcommands");
    lines.push(
      ...commands.map((command) => commandToMd(command, startLevel + 2), [
        ...parents,
        name,
      ])
    );
  }
  return lines.join("\n");
}
/**
 * Document a top-level cli - recommended use case
 * @param commander Top level commander object (usually from `export commander` or `module.exports.commander = commander`)
 * @param cliName Name of the executable (for usage documentation)
 * @param startLevel Level to start the markdown headers (e.g. use 2 or greater to fit it into sub-documentation)
 */
export function commanderToMd(
  commander: { [key: string]: any },
  cliName: string,
  startLevel: number = 1
) {
  const inspectedCommander = getCommand(commander);
  let lines: string[] = [];
  lines.push(padLevel(startLevel) + " Usage");
  lines.push("```bash");
  if (
    inspectedCommander.commands &&
    inspectedCommander.commands.filter(Boolean).length
  )
    lines.push(cliName + " [options] [command]");
  else
    lines.push(
      cliName +
        " [options]" +
        (inspectedCommander.args && !!inspectedCommander.args!.length
          ? " " +
            inspectedCommander
              .args!.map(({ required, name, variadic }) => {
                const pieces: string[] = [];
                pieces.push(required ? "<" : "[");
                if (variadic) pieces.push("...");
                pieces.push(name);
                pieces.push(required ? ">" : "]");
                return pieces.join("");
              })
              .join(" ")
          : "")
    );
  lines.push("```");
  if (inspectedCommander.description)
    lines.push(inspectedCommander.description);
  if (
    inspectedCommander.options &&
    inspectedCommander.options.filter(Boolean).length
  ) {
    lines.push(padLevel(startLevel) + " Options");
    lines.push(
      ...inspectedCommander.options.map((option) => optionToMd(option))
    );
  }
  if (
    inspectedCommander.commands &&
    inspectedCommander.commands.filter(Boolean).length
  ) {
    lines.push(padLevel(startLevel) + " Commands");
    lines.push(
      ...inspectedCommander.commands.map((command) =>
        commandToMd(command, startLevel + 1, [cliName])
      )
    );
  }
  return lines.join("\n");
}
export default commanderToMd;
