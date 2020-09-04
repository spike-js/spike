import { Sade } from 'sade';
import { CliOptions } from '../cli';

export function addPackCommand(prog: Sade, options: CliOptions) {
  prog
    .command('Pack', 'TODO')
    .describe('Pack your Spike project once')
    .action(packCommandHandler(options));
}

export function packCommandHandler(options: CliOptions) {
  return () => {
    console.log('Packing...');
    console.log(options);
  }
}

export default addPackCommand;