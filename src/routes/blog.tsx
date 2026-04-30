import type { RouteSectionProps } from "@solidjs/router";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import { Show } from "solid-js";
// @ts-expect-error
import { MDXProvider } from "solid-mdx";
import { BlogPostCard } from "#components/blog/blog-post-card";
import { TagList } from "#components/blog/tag-list";
import { Metadata } from "#components/common/metadata";
import { Sidebar } from "#components/common/sidebar";
import { Icon } from "#components/icons";
import { blogPosts } from "#data/blog-posts";
import { useBlogSidebarGroups } from "#hooks/use-blog-sidebar-groups";
import styles from "./blog.module.css";

const pathRegex = /\/?blog\/(?<slug>[\w-]+)\/?/;

const buildUrl = (slug: string | undefined) => `/blog/${slug}/` as const;

const BlogPost = (props: RouteSectionProps) => {
  const slug = () => pathRegex.exec(props.location.pathname)?.groups?.slug;

  // biome-ignore lint/style/noNonNullAssertion: Fetch is synchronous, so always defined
  const post = () => blogPosts.find((post) => post.slug === slug())!;

  const url = () => buildUrl(slug());
  const imageUrl = () => `${url()}social.png` as const;

  const blogPostSidebarGroups = useBlogSidebarGroups();

  const newerPost = () =>
    minBy(
      blogPosts.filter((otherPost) => otherPost.date > post().date),
      (otherPost) => otherPost.date,
    );
  const olderPost = () =>
    maxBy(
      blogPosts.filter((otherPost) => otherPost.date < post().date),
      (otherPost) => otherPost.date,
    );

  return (
    <div class={styles.container}>
      <Metadata
        type="article"
        title={post().title}
        description={post().description}
        url={url()}
        image={{ url: imageUrl(), alt: post().thumbnailAltText }}
        authors={post().authors}
        tags={post().tags}
        publishedTime={post().date}
      />
      <aside>
        <Sidebar groups={blogPostSidebarGroups} />
      </aside>
      <article class={styles.post}>
        <BlogPostCard post={post()} />

        <div class="markdown-full">
          <MDXProvider>{props.children}</MDXProvider>
        </div>

        <footer class={styles.footer}>
          <div class={styles.tagsAndEdit}>
            <TagList tags={post().tags} />
            <a
              href={`https://github.com/tasbox-org/site/blob/master/src/routes/blog/${post().filesystemPath}/index.mdx`}
              target="_blank"
              rel="noopener noreferrer"
              class={styles.editLink}
            >
              <Icon name="documentation" /> Edit this post
            </a>
          </div>
          <nav class={styles.nav}>
            <Show when={newerPost()}>
              <a href={buildUrl(newerPost()?.slug)} class={styles.newer}>
                <div class={styles.navHeading}>Newer post</div>
                <div class={styles.navPostTitle}>{newerPost()?.title}</div>
              </a>
            </Show>
            <Show when={olderPost()}>
              <a href={buildUrl(olderPost()?.slug)} class={styles.older}>
                <div class={styles.navHeading}>Older post</div>
                <div class={styles.navPostTitle}>{olderPost()?.title}</div>
              </a>
            </Show>
          </nav>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
