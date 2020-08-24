#!/usr/bin/env node
import prog from './prog';
import spike from './index';

const run = (cmd: string) => {
  spike(cmd)
    .then((output: any) => {
      if (output != null) console.info(cmd);
      if (!cmd.includes('watch')) process.exit(0);
    })
    .catch((error: any) => {
      process.exitCode = (typeof error.code === 'number' && error.code) || 1;
      console.error(error);
      process.exit();
    });
};

prog(run)(process.argv);
