import { Sade } from 'sade';
import { startService } from 'esbuild';
import { CliOptions } from '../cli';

export function addWatchCommand(prog: Sade, options: CliOptions) {
  prog
    .command('build <entryPoints>', 'TODO', { default: true })
    .describe('Build your Spike project once')
    .action(watchCommandHandler(options));
}

export function watchCommandHandler(options: CliOptions) {
  return async (entryPoints: string) => {
    const esbuild = await startService();

    try {
      throw new Error("Not yet implemented");
      console.log(entryPoints, options);
    }
    catch (error) {
      throw error;
    }
    finally {
      esbuild.stop();
    }
  }
}

export default addBuildCommand;