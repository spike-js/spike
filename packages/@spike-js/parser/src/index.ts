import path from 'path';
import { promises as fs } from 'fs';
import { map, filter, reduce } from 'asyncro';
import reshape from 'reshape';
// import { modifyNodes } from 'reshape-plugin-util';

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
      id: file,
      // assume a file found means an external node
      type: 'external',
      // assign an external location
      location: path.resolve(path.join(cwd, file)),
      // assign the node a mimeType
      mimeType: getMime(file),
    })
  );

  const nodesWithChildren = await map(
    await filter(externalNodes, async (node: Node) => node.mimeType === 'html'),
    async (node: Node) => {
      // here we need to traverse html files and find scripts and css linked
      // within to set as children/dependencies of said html files
      const html = await fs.readFile(node.location as string);

      const tags = new Promise(async (resolve, _) => {
        reshape()
          .process(html)
          .then((output: any) => {
            console.log(output.output());
            resolve(output.output());
          });
      });

      const srcs = tags.then((res: any) => getScriptSrc(res));

      node.children = await srcs;
    }
  );

  return await reduce(
    await externalNodes.concat(nodesWithChildren),
    async (graph: Graph, node: Node) => {
      graph.push(node);
      return graph;
    },
    []
  ).then((res: Graph) => console.log(res));
}

function getScriptSrc(tree: any) {
  return [...tree].reduce((m: any, node: any) => {
    if (node.name === 'script') {
      if (node.attrs.src) {
        m.push(node.attrs.src.content);
      }
    }
  }, []);
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
