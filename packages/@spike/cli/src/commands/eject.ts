import { Sade } from 'sade';
import { CliOptions } from '../cli';

export function addEjectCommand(prog: Sade, options: CliOptions) {
  prog
    .command('Eject', 'TODO')
    .describe('Eject your Spike project once')
    .action(ejectCommandHandler(options));
}

export function ejectCommandHandler(options: CliOptions) {
  return () => {
    console.log('Ejecting...');
    console.log(options);
  }
}

export default addEjectCommand;