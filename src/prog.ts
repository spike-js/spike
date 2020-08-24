import sade from 'sade';

const prog = sade('spike');

export default (handler: (type: string) => void) => {
  const cmd = (type: string) => (opts: { watch: boolean }) => {
    opts.watch = type === 'watch';
    handler(type);
  };

  prog
    .command('build', '', { default: true })
    .describe('Build your Spike project once')
    .action(cmd('build'));
  prog
    .command('pack')
    .describe('Prepare node modules for the browser')
    .action(cmd('pack'));
  prog
    .command('watch')
    .describe('Watches for changes')
    .action(cmd('watch'));
  prog
    .command('clean')
    .describe('Cleans out the build directory')
    .action(cmd('clean'));
  prog
    .command('eject')
    .describe('Vaya con Dios, amigo')
    .action(cmd('eject'));

  return (argv: string[]) => prog.parse(argv);
};
