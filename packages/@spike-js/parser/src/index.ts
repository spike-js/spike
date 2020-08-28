import path from 'path';
import { promises as fs } from 'fs';

let cwd = process.cwd();

/** NOTES:
 * 1. find all the files
 * 2. ignore the ones that need to be ignored
 * 3. classify each fileNode with a type
 *  type Graph = Node[]

    type Node = {
      type: “javascript” | “typescript” | “css” | “html”
      id: string // filepath
      children: string[]
      data: unknown
    }
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
  let graph: Graph = [];

  // first we add external nodes to the graph, these are easy...
  const externalNodes = files
    .filter(file => !isDotfile(file))
    .map(async file => {
      let node: Node = {};
      // we can safely assume that if a node has a file, it is an external
      // node
      node.type = 'external';

      // assign the node a mimeType
      if (file.match(/\.html/)) {
        node.mimeType = 'html';
      }
      if (file.match(/\.css/)) {
        node.mimeType = 'css';
      }
      if (file.match(/\.js/)) {
        node.mimeType = 'javascript';
      }

      // assign a location
      node.location = path.resolve(path.join(cwd, file));

      return node;
    });

  externalNodes.forEach(n => graph.push(n));

  // await Promise.all(
  //   files
  //     .filter(f => !isDotfile(f)) // we dont care about config files
  //     .map(async file => {
  //       // we will create an external node out of each file
  //       let node: Node = {};

  //       // assign the node a mimeType
  //       if (file.match(/\.html/)) {
  //         node.mimeType = 'html';
  //       }
  //       if (file.match(/\.css/)) {
  //         node.mimeType = 'css';
  //       }
  //       if (file.match(/\.js/)) {
  //         node.mimeType = 'javascript';
  //       }

  //       // we can safely assume that if a node has a file, it is an external
  //       // node
  //       node.type = 'external';

  //       // assign a location
  //       // we will handle internal locations later
  //       node.location = path.resolve(path.join(cwd, file));

  //       // add these simple nodes to the graph
  //       graph.push(node);
  //     })
  // ).then(() =>
  //   graph
  //     .filter(node => node.mimeType === 'html')
  //     .map(node => {
  //       console.log(node);
  //     })
  // );

  return graph;
}

const isDotfile = (str: string) => str.match(/\^.*/);

console.log(parser());
