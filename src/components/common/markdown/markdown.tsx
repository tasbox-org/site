import { SolidMarkdown } from "solid-markdown";
import { rehypeMdxPrism } from "#theme/prisma/rehype-mdx-prism";

export const Markdown = (props: { children?: string }) => (
  <SolidMarkdown class="markdown-slim" rehypePlugins={[rehypeMdxPrism]}>
    {props.children}
  </SolidMarkdown>
);
