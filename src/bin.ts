#!/usr/bin/env node
import commander from "commander";
import { commanderToMd, getCommand } from ".";
import { writeFileSync } from "fs";
import { resolve } from "path";
commander
  .command("markdown <sourcefile>")
  .option(
    "-e --exported <commanderObject>",
    "Name of the exported commander object to inspect",
    "commander"
  )
  .option(
    "-o --out-file <outfile>",
    "File to store markdown output (defaults to stdout)"
  )
  .option("-n --cli-name <name>", "Name of the executable")
  .action((sourcefile, { exported, outFile, cliName = sourcefile }) => {
    const resolvedSource = resolve(process.cwd(), sourcefile);
    //need to clean out commander
    if (resolvedSource !== __filename) {
      commander.commands = [];
      commander.parse = () => commander;
    }
    commander.isDocumenting = true;
    const exports = require(resolvedSource);
    const command = exports[exported];
    if (!command) {
      console.error("no export found at ", exported);
      process.exit(1);
    }
    const markdown = commanderToMd(command, cliName);
    if (outFile) writeFileSync(outFile, markdown);
    else process.stdout.write(markdown);
  });
commander
  .command("json <sourcefile>")
  .description("Extract inspected commander as JSON")
  .option(
    "-e --exported <commanderObject>",
    "Name of the exported commander object to inspect",
    "commander"
  )
  .option(
    "-o --out-file <outfile>",
    "File to store markdown output (defaults to stdout)"
  )
  .action((sourceFile, { exported, outFile }) => {
    const resolvedSource = resolve(process.cwd(), sourceFile);
    const exports = require(resolvedSource);
    const command = exports[exported];
    if (!command) {
      console.error("no export found at ", exported);
      process.exit(1);
    }
    const obj = getCommand(command);
    const json = JSON.stringify(obj, null, 2);
    if (outFile) writeFileSync(outFile, json);
    else process.stdout.write(json);
  });
commander.parse(process.argv);
export { commander };
