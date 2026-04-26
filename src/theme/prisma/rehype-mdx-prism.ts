import { toString as hastToString } from "hast-util-to-string";
import { refractor } from "refractor";
import lua from "refractor/lua";
import type { Node, Parent } from "unist";
import { visit } from "unist-util-visit";
import { moonjuice } from "./moonjuice";

refractor.register(lua);
refractor.register(moonjuice);

const visitor = (node: Node, index: number | undefined, parent: Parent | undefined) => {
  if (node.type !== "element" || (node as any).tagName !== "code") {
    return;
  }

  const language = ((node as any).properties.className as string[] | undefined)
    ?.find((className) => className.startsWith("language-"))
    ?.slice("language-".length);

  if (!language) {
    (node as any).properties.className = (node as any).properties.className ?? [];
    (node as any).properties.className.push("language-plaintext");
    return;
  }

  const result = refractor.highlight(hastToString(node as any), language);
  (node as any).children = result.children;
};

export const rehypeMdxPrism = () => {
  return (tree: Node) => {
    visit(tree, "element", visitor);
  };
};
