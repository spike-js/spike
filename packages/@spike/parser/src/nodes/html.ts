import { promises as fs } from "fs";
import reshape from 'reshape';
import { Node } from "./base";
import { Graph } from '../parser';
import { getScriptNodes } from './script';

export const getHtmlNodeMeta = async (node: Node, graph: Graph) => {
  if (node.mimeType === 'html') {
    // here we need to traverse html files and find scripts and css linked
    // within to set as children/dependencies of said html files
    const html = await fs.readFile(node.location as string, { encoding: "utf-8" });
    const html_plugins = [getScriptNodes(graph, node)]
    
    await reshape({ plugins: html_plugins })
      .process(html);

    return node;
  }

  return node;
}