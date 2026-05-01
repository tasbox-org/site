import { visit } from "unist-util-visit";
import "mdast-util-directive";
import { h } from "hastscript";
import type { Root } from "mdast";

export const ADMONITIONS = ["note", "tip", "important", "warning", "caution"] as const;

export const remarkAdmonition = () => {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") {
        return;
      }

      if (!ADMONITIONS.some((type) => node.name === type)) {
        return;
      }

      const data = node.data ?? {};

      data.hName = "div";
      data.hProperties = h("div", { class: `admonition ${node.name}` }).properties;

      node.data = data;
    });
  };
};
