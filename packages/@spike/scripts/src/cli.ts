import sade from "sade";
import addBuildCommand from './commands/build';

const CLI = sade('spike-scripts');

export type Commands =
  "build" |
  "watch"

export interface CliOptions {
  workingDirectory: string;
  outputDirectory: string;
}

export async function createCommandLine(options: CliOptions) {
  addBuildCommand(CLI, options);

  return (argv: string[]) => CLI.parse(argv);
};

export default createCommandLine;