import type { RouteSectionProps } from "@solidjs/router";
// @ts-expect-error
import { MDXProvider } from "solid-mdx";
import { BlogPostCard } from "#components/blog/blog-post-card";
import { Metadata } from "#components/common/metadata";
import { Sidebar } from "#components/common/sidebar";
import { blogPosts } from "#data/blog-posts";
import { useBlogSidebarGroups } from "#hooks/use-blog-sidebar-groups";
import styles from "./blog.module.css";

const pathRegex = /\/?blog\/(?<slug>[\w-]+)\/?/;

const BlogPost = (props: RouteSectionProps) => {
  const slug = () => pathRegex.exec(props.location.pathname)?.groups?.slug;
  const post = () => blogPosts.find((post) => post.slug === slug());

  const url = () => `/blog/${slug()}/` as const;
  const imageUrl = () => `${url()}social.png` as const;

  const blogPostSidebarGroups = useBlogSidebarGroups();

  return (
    <div class={styles.container}>
      <Metadata
        type="article"
        title={post()?.title ?? ""}
        description={post()?.description ?? ""}
        url={url()}
        image={{ url: imageUrl(), alt: post()?.thumbnailAltText ?? "" }}
        authors={post()?.authors ?? []}
        tags={post()?.tags ?? []}
      />
      <aside>
        <Sidebar groups={blogPostSidebarGroups} />
      </aside>
      <article class={styles.post}>
        <BlogPostCard post={post()!} />

        <div class="markdown-full">
          <MDXProvider>{props.children}</MDXProvider>
        </div>

        <footer>TODO prev/next buttons, tags, and link to edit on github</footer>
      </article>
    </div>
  );
};

export default BlogPost;
