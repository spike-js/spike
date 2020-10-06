import { join } from 'path';
import { mkdir, rm } from 'shelljs';

const OUT_DIR = 'out';
const cwd = process.cwd();

export default async (cmd: string) => {
  if (cmd === 'build') {
    console.log('building...');
    mkdir('-p', join(cwd, OUT_DIR));
  }
  if (cmd === 'pack') {
    console.log('packing...');
  }
  if (cmd === 'watch') {
    console.log('watching...');
  }
  if (cmd === 'clean') {
    console.log('cleaning...');
    rm('-rf', OUT_DIR);
  }
  if (cmd === 'eject') {
    console.log('ejecting...');
  }

  return console.log(cmd);
};
