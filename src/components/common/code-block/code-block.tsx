import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { refractor } from "refractor";
import { createMemo } from "solid-js";
import { Fragment, jsx, jsxs } from "solid-js/h/jsx-runtime";

export interface CodeBlockProps {
  language: "lua" | "moonjuice";
  children?: string;
}

export const CodeBlock = (props: CodeBlockProps) => {
  const resolved = createMemo(() => {
    const ast = refractor.highlight(props.children ?? "", props.language);

    return toJsxRuntime(ast, { Fragment, jsxs, jsx, elementAttributeNameCase: "html", stylePropertyNameCase: "css" });
  });

  return (
    <pre>
      <code class={`language-${props.language}`}>{resolved()}</code>
    </pre>
  );
};
