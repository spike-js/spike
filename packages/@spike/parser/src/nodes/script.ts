import { Graph } from '../parser';
import createGraphNode, { Node } from './base';

export function getScriptNodes(graph: Graph, htmlNode: Node) {
  // Recursive function to walk to script tags
  // and update htmlNode and graph accordingly
  const walkToScriptTag = (tree: any, htmlNode: any, graph: Graph) => {
    tree.forEach(
      (node: any) => {
        if (node.name === 'script') {
          if (node.attrs.src) {
            const scriptNode = createGraphNode(node.attrs.src.content);

            htmlNode.children.push(node.attrs.src.content as string);

            graph.push(scriptNode);
          }
        }
        else if (node.content.length > 0) {
          walkToScriptTag(node.content, htmlNode, graph);
        }
      },
      []
    );

    return tree;
  }

  return (tree: any) => walkToScriptTag(tree, htmlNode, graph);
}