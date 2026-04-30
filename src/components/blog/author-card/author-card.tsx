import { Icon } from "#components/icons";
import type { Author } from "#data/authors";
import styles from "./author-card.module.css";

export interface AuthorCardProps {
  author: Author;
}

export const AuthorCard = (props: AuthorCardProps) => (
  <div class={styles.card}>
    <img src={props.author.avatarUrl} alt="" aria-hidden class={styles.avatar} />
    <div>
      <div class={styles.name}>{props.author.name}</div>
      <div class={styles.title}>{props.author.title}</div>
      <div>
        <a
          href={`https://github.com/${props.author.socials.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <Icon name="github" />
        </a>
      </div>
    </div>
  </div>
);
