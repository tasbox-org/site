import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { SolidMarkdown } from "solid-markdown";
import { remarkAdmonition } from "#theme/admonition/remark-admonition";
import { rehypeMdxPrism } from "#theme/prisma/rehype-mdx-prism";

export const Markdown = (props: { children?: string; variant?: "slim" | "full" }) => (
  <SolidMarkdown
    class={props.variant === "full" ? "markdown-full" : "markdown-slim"}
    remarkPlugins={[remarkGfm, remarkFrontmatter, remarkDirective, remarkAdmonition]}
    rehypePlugins={[rehypeMdxPrism]}
  >
    {props.children}
  </SolidMarkdown>
);
