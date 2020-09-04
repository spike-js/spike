import { Sade } from 'sade';
import { CliOptions } from '../cli';
import { parser, Graph } from '@spike/parser';

export function addBuildCommand(prog: Sade, options: CliOptions) {
  prog
    .command('build', 'TODO', { default: true })
    .describe('Build your Spike project once')
    .action(buildCommandHandler(options));
}

export function buildCommandHandler(options: CliOptions) {
  return async () => {
    let graph: Graph;

    console.log("Building...");
    console.log(options);
    
    graph = await parser({
      workingDirectory: options.workingDirectory
    });

    console.log(graph);
  }
}

export default addBuildCommand;