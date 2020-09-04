import { promises as fs } from 'fs';
import { Sade } from 'sade';
import { startService } from 'esbuild';
import { CliOptions } from '../cli';

export function addBuildCommand(prog: Sade, options: CliOptions) {
  prog
    .command('build <...entryPoints>', 'TODO', { default: true })
    .describe('Build your Spike project once')
    .action(buildCommandHandler(options));
}

export function buildCommandHandler(options: CliOptions) {
  return async (entryPoints: string) => {
    const esbuild = await startService();

    try {
      const files = entryPoints.split(",");
      const outputBundles = await Promise.all(
        files
          .map(async file => await fs.readFile(file, { encoding: "utf-8" }))
          .map(async file => ({
            file: await file,
            data: await esbuild.transform(await file)
          })
        )
      );

      const results = await Promise.all(
        outputBundles.map(async (bundle) => {
          const bundlePath = bundle.file
            .replace(options.workingDirectory, options.outputDirectory)
            .replace('.ts', '.js');
          const bundleMapPath = bundle.file
            .replace(options.workingDirectory, options.outputDirectory)
            .replace('.ts', '.map.js');
            
          fs.writeFile(bundlePath, bundle.data.js, { encoding: 'utf-8' });
          fs.writeFile(bundleMapPath, bundle.data.js, { encoding: 'utf-8' });

          return {
            file: bundlePath,
            map: bundleMapPath,
            entry: bundle.file,
            data: bundle.data
          }
        })
      );

      console.log(results);
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