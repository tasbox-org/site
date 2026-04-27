import { toHtml } from "hast-util-to-html";
import { refractor } from "refractor";
import { createMemo } from "solid-js";

export interface CodeBlockProps {
  language: "lua" | "moonjuice";
  children?: string;
}

export const CodeBlock = (props: CodeBlockProps) => {
  const resolved = createMemo(() => {
    const ast = refractor.highlight(props.children ?? "", props.language);

    return toHtml(ast);
  });

  return (
    <pre>
      <code class={`language-${props.language}`} innerHTML={resolved()} />
    </pre>
  );
};
