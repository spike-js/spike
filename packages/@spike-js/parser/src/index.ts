import path from 'path';
import { promises as fs } from 'fs';
import { map, filter, reduce } from 'asyncro';

let cwd = process.cwd();

/** NOTES:
 * 1. find all the files
 * 2. ignore the ones that need to be ignored
 * 3. classify each fileNode with a type, mime, and location
 * 4.
 */

type Graph = Node[];
interface Node {
  id?: string;
  data?: unknown;
  type?: 'internal' | 'external';
  location?: FilePath | InternalPath;
  mimeType?: 'javascript' | 'typescript' | 'css' | 'html';
  children?: string[];
}
type FilePath = string;
type InternalPath = {
  start: {
    line: number;
    col: number;
  };
  end: {
    line: number;
    col: number;
  };
};

export default async function parser(): Promise<Graph> {
  let files = await fs.readdir(cwd);

  const externalNodes = await map(
    await filter(files, async (file: string) => !file.match(/\^.*/)),
    async (file: string) => ({
      // assume a file found means an external node
      type: 'external',
      // assign an external location
      location: path.resolve(path.join(cwd, file)),
      // assign the node a mimeType
      mimeType: getMime(file),
    })
  );

  console.log(externalNodes);

  const graph = reduce(
    externalNodes,
    async (graph: Graph, node: Node) => {
      graph.push(node);
      return graph;
    },
    []
  );

  console.log(graph);

  return graph;
}

const getMime = (path: string) =>
  path.match(/\.html/)
    ? 'html'
    : path.match(/\.css/)
    ? 'css'
    : path.match(/\.js/)
    ? 'javascript'
    : 'unknown';

console.log(parser());
