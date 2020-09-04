import { Sade } from 'sade';
import { CliOptions } from '../cli';

export function addCleanCommand(prog: Sade, options: CliOptions) {
  prog
    .command('Clean', 'TODO')
    .describe('Clean your Spike project once')
    .action(cleanCommandHandler(options));
}

export function cleanCommandHandler(options: CliOptions) {
  return () => {
    console.log('Cleaning...');
    console.log(options);
  }
}

export default addCleanCommand;