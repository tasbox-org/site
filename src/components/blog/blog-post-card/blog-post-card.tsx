import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import { AuthorCard } from "#components/blog/author-card";
import { TagList } from "#components/blog/tag-list";
import { Markdown } from "#components/common/markdown";
import { authors } from "#data/authors";
import type { BlogPost } from "#data/blog-posts";
import styles from "./blog-post-card.module.css";

export interface BlogPostCardProps {
  post: BlogPost;
  enableHeaderLink?: boolean;
  showFooter?: boolean;
}

export const BlogPostCard = (props: BlogPostCardProps) => {
  const postAuthors = () =>
    props.post.authors
      .map((authorSlug) => authors.find((author) => author.slug === authorSlug))
      .filter((author) => author !== undefined);

  return (
    <div class={styles.card}>
      <header class={styles.heading}>
        <h1 class={styles.title}>
          <Show when={props.enableHeaderLink} fallback={<span>{props.post.title}</span>}>
            <A href={`/blog/${props.post.slug}`} class={styles.link}>
              {props.post.title}
            </A>
          </Show>
        </h1>
        <time dateTime={props.post.date.toISOString()} class={styles.time}>
          {props.post.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </time>
        <div>
          <For each={postAuthors()}>{(author) => <AuthorCard author={author} />}</For>
        </div>
      </header>
      <Markdown>{props.post.description}</Markdown>
      <img src={`/blog/${props.post.slug}/social.png`} alt={props.post.thumbnailAltText} class={styles.thumbnail} />
      <Show when={props.showFooter}>
        <footer class={styles.footer}>
          <TagList tags={props.post.tags} />
          <A href={`/blog/${props.post.slug}`} class={styles.link}>
            Read more
          </A>
        </footer>
      </Show>
    </div>
  );
};
