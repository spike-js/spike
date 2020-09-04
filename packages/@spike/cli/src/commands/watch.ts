import { Sade } from 'sade';
import { CliOptions } from '../cli';

export function addWatchCommand(prog: Sade, options: CliOptions) {
  prog
    .command('Watch', 'TODO')
    .describe('Watch your Spike project once')
    .action(watchCommandHandler(options));
}

export function watchCommandHandler(options: CliOptions) {
  return () => {
    console.log(options);
    console.log('Watching...');
  }
}

export default addWatchCommand;