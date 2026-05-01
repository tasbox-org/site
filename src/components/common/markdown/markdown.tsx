import { SolidMarkdown } from "solid-markdown";
import { rehypeMdxPrism } from "#theme/prisma/rehype-mdx-prism";

export const Markdown = (props: { children?: string; variant?: "slim" | "full" }) => (
  <SolidMarkdown class={props.variant === "full" ? "markdown-full" : "markdown-slim"} rehypePlugins={[rehypeMdxPrism]}>
    {props.children}
  </SolidMarkdown>
);
