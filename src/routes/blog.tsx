import type { RouteSectionProps } from "@solidjs/router";
// @ts-expect-error
import { MDXProvider } from "solid-mdx";
import { Metadata } from "#components/common/metadata";
import { blogPosts } from "#data/blog-posts";

const pathRegex = /\/?blog\/(?<slug>[\w-]+)\/?/;

const BlogPost = (props: RouteSectionProps) => {
  const slug = () => pathRegex.exec(props.location.pathname)?.groups?.slug;
  const post = () => blogPosts.find((post) => post.slug === slug());

  const url = () => `/blog/${slug()}/` as const;
  const imageUrl = () => `${url()}social.png` as const;

  return (
    // TODO: Sidebar with all posts sorted by release
    <article>
      <Metadata
        type="article"
        title={post()?.title ?? ""}
        description={post()?.description ?? ""}
        url={url()}
        image={{ url: imageUrl(), alt: post()?.thumbnailAltText ?? "" }}
        authors={post()?.authors ?? []}
        tags={post()?.tags ?? []}
      />

      <header>
        <h1>{post()?.title}</h1>
      </header>

      {/* TODO: Author card and datetime */}

      <p>{post()?.description}</p>
      <img src="social.png" alt={post()?.thumbnailAltText} />

      <div class="markdown">
        <MDXProvider>{props.children}</MDXProvider>
      </div>

      <footer>TODO prev/next buttons, tags, and link to edit on github</footer>
    </article>
  );
};

export default BlogPost;
