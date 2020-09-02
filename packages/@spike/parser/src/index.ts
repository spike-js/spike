import path from 'path';
import { promises as fs } from 'fs';
import { map, filter, reduce } from 'asyncro';
import reshape from 'reshape';
import { modifyNodes } from 'reshape-plugin-util';

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
  mimeType?: 'javascript' | 'typescript' | 'css' | 'html' | 'unknown';
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

  const nodes = await map(
    await filter(files, async (file: string) => !file.match(/\^.*/)),
    async (file: string) => {
      let node: Node = {
        type: 'external',
        id: file,
        location: path.resolve(path.join(cwd, file)),
        mimeType: getMime(file),
      };

      if (node.mimeType === 'html') {
        node.children = await map([], async () => {
          const html = await fs.readFile(node.location as string);

          return () =>
            reshape()
              .process(html)
              .then((res: any) => {
                return extractSrcPath(res);
              });
        });
      }
      return node;
    }
  );

  return await reduce(
    nodes,
    async (graph: Graph, node: Node) => {
      graph.push(node);
      return graph;
    },
    []
  ).then((res: Graph) => console.log(res));
}

const isScript = (node: any) => {
  return node.type === 'tag' && node.name === 'script';
};

function extractSrcPath(tree: any) {
  return modifyNodes(
    tree,
    (node: any) => isScript(node),
    (node: any) => {
      if (!node.attrs.src) {
        return ':(';
      }
      return node.attrs.src.content;
    }
  );
}

const getMime = (path: string) =>
  path.match(/\.html/)
    ? 'html'
    : path.match(/\.css/)
    ? 'css'
    : path.match(/\.js/)
    ? 'javascript'
    : path.match(/\.ts/)
    ? 'typescript'
    : 'unknown';

parser();
