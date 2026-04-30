import { For } from "solid-js";
import styles from "./tag-list.module.css";

export interface TagListProps {
  tags: string[];
}

export const TagList = (props: TagListProps) => (
  <div class={styles.tags}>
    Tags:
    <ul class={styles.tagList}>
      <For each={props.tags}>{(tag) => <li class={styles.tag}>{tag}</li>}</For>
    </ul>
  </div>
);
