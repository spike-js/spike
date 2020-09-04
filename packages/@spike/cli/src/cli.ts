import sade from "sade";
import addBuildCommand from './commands/build';
import addWatchCommand from './commands/watch';
import addPackCommand from './commands/pack';
import addCleanCommand from './commands/clean';
import addEjectCommand from './commands/eject';

const CLI = sade('spike');

export type Commands =
  "build" |
  "watch" |
  "pack" |
  "clean" |
  "eject";

export interface CliOptions {
  workingDirectory: string;
  outputDirectory: string;
}

export async function createCommandLine(options: CliOptions) {
  addBuildCommand(CLI, options);
  addWatchCommand(CLI, options);
  addPackCommand(CLI, options);
  addCleanCommand(CLI, options);
  addEjectCommand(CLI, options);

  return (argv: string[]) => CLI.parse(argv);
};

export default createCommandLine;