#!/usr/bin/env node
import { join } from 'path';
import { createCommandLine, CliOptions } from './cli';

const options: CliOptions = {
  workingDirectory: process.cwd(),
  outputDirectory: join(process.cwd(), "./build")
};

createCommandLine(options)
  .then(cli => {
    cli(process.argv);

    process.exit(0);
  })
  .catch(error => {
    console.error(error);

    process.exit(1);
  })

