import { For, Show } from "solid-js";
import { AuthorCard } from "#components/blog/author-card";
import { Markdown } from "#components/common/markdown";
import { authors } from "#data/authors";
import type { BlogPost } from "#data/blog-posts";
import styles from "./blog-post-card.module.css";

export interface BlogPostCardProps {
  post: BlogPost;
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
          <a href={`/blog/${props.post.slug}`} class={styles.link}>
            {props.post.title}
          </a>
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
          <div class={styles.tags}>
            Tags:
            <ul class={styles.tagList}>
              <For each={props.post.tags}>{(tag) => <li class={styles.tag}>{tag}</li>}</For>
            </ul>
          </div>
          <a href={`/blog/${props.post.slug}`} class={styles.link}>
            Read more
          </a>
        </footer>
      </Show>
    </div>
  );
};
