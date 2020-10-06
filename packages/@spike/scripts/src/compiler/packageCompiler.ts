import rollup, {InputOptions, OutputOptions} from "rollup";
import autoInstall from "@rollup/plugin-auto-install";
import commonjs from "@rollup/plugin-commonjs";
import wasm from "@rollup/plugin-wasm";
import virtual from "@rollup/plugin-virtual";
import esbuild from "rollup-plugin-esbuild";

export interface PackageCompilerOptions {
  entries: Entry[],
  production: boolean;
  watch: boolean;
  /* @experimental please be careful, this will void stability promises */
  rollup: {
    input: InputOptions,
    output: OutputOptions
  }
}

export interface PackageCompiler {
  build(): Promise<void>
  watch(): Promise<void>
}

export interface Entry {
  name: string;
  content: string;  
}

export interface VirtualModules {
  [name: string]: string;
}

export function createPackageCompiler(options: PackageCompilerOptions) {
  const virtualModules = options.entries.reduce((modules, entry, i) => {
    if (!entry.name) throw new Error(`Entry ${i} missing name`);
    if (!entry.content) throw new Error(`Entry ${entry.name} is missing content`);

    modules[entry.name] = entry.content;
  }, {} as VirtualModules);
  const inputOptions: Partial<InputOptions> = {
    input: options.entries.map(entry => entry.name),
    treeshake: true,
    plugins: [
      virtual(options.entries)
    ]
  }

  return {
    build: () => rollup.rollup(rollupOptions),
    watch: () => rollup.watch(rollupOptions)
  }
}