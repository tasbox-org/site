import { refractor } from "refractor";
import lua from "refractor/lua";
import { visit } from "unist-util-visit";
import type { Node, Parent } from "unist";
import { toString } from "hast-util-to-string";

refractor.register(lua);

const visitor = (node: Node, index: number | undefined, parent: Parent | undefined) => {
  if (parent?.type !== "mdxJsxFlowElement") {
    return;
  }

  const attributes = (parent as any).attributes.reduce((prev: any, curr: any) => {
    if (curr.type === "mdxJsxAttribute") {
      return { ...prev, [curr.name]: curr.value };
    }

    return prev;
  }, {});

  const language = attributes.lang;
  if (!language) {
    return;
  }

  const result = refractor.highlight(toString(node as any), language);
  (node as any).children = result.children;
};

export const mdxPrism = () => {
  return (tree: Node) => {
    visit(tree, "element", visitor);
  };
};
