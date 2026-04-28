import { For } from "solid-js";
import { Description } from "#components/docs/description";
import type { BlogPost } from "#data/blog-posts";

export const BlogPostCard = (props: BlogPost) => (
  <article>
    <header>
      <h1>
        <a href={`/blog/${props.slug}`}>{props.title}</a>
      </h1>
      <time dateTime={props.date.toISOString()}>
        {props.date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
      </time>
      <div>
        <For each={props.authors}>{(author) => <div>{author}</div>}</For>
      </div>
    </header>
    <Description value={props.description} />
    <img src={`/blog/${props.slug}/social.png`} alt={props.thumbnailAltText} />
    <footer>
      <div>
        Tags:
        <ul>
          <For each={props.tags}>{(tag) => <li>{tag}</li>}</For>
        </ul>
      </div>
      <a href={`/blog/${props.slug}`}>Read more</a>
    </footer>
  </article>
);
