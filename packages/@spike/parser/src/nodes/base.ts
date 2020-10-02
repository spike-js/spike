import path from 'path';
import findUp from 'find-up';
import { getMime } from '../utils';

export interface Node {
  id: string;
  type: 'internal' | 'external';
  nodeLocation: FilePath | InternalPath;
  mimeType: MimeTypes;
  children: string[];
  data?: unknown;
}

export type MimeTypes =
  | 'javascript'
  | 'typescript'
  | 'css'
  | 'html'
  | 'unsupported';

export type FilePath = string;

export type InternalPath = {
  start: {
    line: number;
    col: number;
  };
  end: {
    line: number;
    col: number;
  };
};

export type SpikeConfigFile = 'spike.config.js' | '.spikerc';

export function relativePathFromSpikeRoot(filepath: string): string {
  const rootIdentifiers: SpikeConfigFile[] = ['spike.config.js', '.spikerc'];
  const spikeRootDir = () => {
    const config_filepath = findUp.sync(rootIdentifiers);
    return (
      config_filepath &&
      path
        .dirname(config_filepath)
        .split('/')
        .slice(-1)[0]
    );
  };

  const root_dir = spikeRootDir();
  if (root_dir) {
    return filepath.split(root_dir)[1];
  }
  return filepath;
}

export async function createGraphNode(file: string): Promise<Node> {
  const relativeUrl = relativePathFromSpikeRoot(path.resolve(file));
  return {
    id: relativeUrl,
    type: 'external',
    nodeLocation: relativeUrl,
    mimeType: getMime(file),
    children: [],
  };
}

export default createGraphNode;
