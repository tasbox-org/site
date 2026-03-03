import { RouteSectionProps } from "@solidjs/router";
import { Base, Meta, Title } from "@solidjs/meta";
import { blogPosts } from "#data/blog-posts";
import { For } from "solid-js";

// @ts-ignore
import { MDXProvider } from "solid-mdx";
import { getUrl } from "#hooks/get-url";

const pathRegex = /\/?blog\/(?<slug>[\w\-]+)\/?/;

const BlogPost = (props: RouteSectionProps) => {
  const slug = () => pathRegex.exec(props.location.pathname)?.groups?.slug;
  const post = () => blogPosts.find((post) => post.slug === slug());

  const rootUrl = () => `${getUrl().origin}/blog/${slug()}/`;
  console.log(rootUrl());
  const rootImageUrl = () => `${rootUrl()}/social.png`;

  return (
    // TODO: Sidebar with all posts sorted by release
    <article>
      <Title>TASBox - {post()?.title}</Title>
      <Meta name="description" content={post()?.description} />
      <Meta name="og:title" content={post()?.title} />
      <Meta name="og:description" content={post()?.description} />
      <Meta name="og:image" content={rootImageUrl()} />
      <Meta name="og:image:alt" content={post()?.thumbnailAltText} />
      <Meta name="og:url" content={rootUrl()} />
      <Meta name="og:site_name" content="TASBox" />
      <Meta name="og:type" content="article" />
      {/* TODO: Add article published time (same as shown below) */}
      <For each={post()?.authors}>{(author) => <Meta name="article:author" content={author} />}</For>
      <For each={post()?.tags}>{(tag) => <Meta name="article:tag" content={tag} />}</For>
      <Base href={rootUrl()} />

      <header>
        <h1>{post()?.title}</h1>
      </header>

      {/* TODO: Author card and datetime */}

      <p>{post()?.description}</p>
      <img src="social.png" alt={post()?.thumbnailAltText} />

      {/* TODO: Custom markdown components. See https://github.com/andi23rosca/andi.dev/blob/main/src/components/Markdown.tsx */}
      <MDXProvider>{props.children}</MDXProvider>

      <footer>TODO prev/next buttons, tags, and link to edit on github</footer>
    </article>
  );
};

export default BlogPost;
