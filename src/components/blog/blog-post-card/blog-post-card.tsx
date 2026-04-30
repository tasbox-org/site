import { For, Show } from "solid-js";
import { Description } from "#components/docs/description";
import type { BlogPost } from "#data/blog-posts";
import styles from "./blog-post-card.module.css";

export interface BlogPostCardProps {
  post: BlogPost;
  showFooter?: boolean;
}

export const BlogPostCard = (props: BlogPostCardProps) => (
  <>
    <header>
      <h1 class={styles.title}>
        <a href={`/blog/${props.post.slug}`} class={styles.link}>
          {props.post.title}
        </a>
      </h1>
      <time dateTime={props.post.date.toISOString()}>
        {props.post.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
      </time>
      <div>
        <For each={props.post.authors}>{(author) => <div>{author}</div>}</For>
      </div>
    </header>
    <Description value={props.post.description} />
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
  </>
);
