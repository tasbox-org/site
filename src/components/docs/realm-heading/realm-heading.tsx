import type { Realm } from "@tasbox-org/docs";
import { RealmIcon } from "#components/icons";
import styles from "./realm-heading.module.css";

export const RealmHeading = (props: { realms: Realm[] | undefined; name: string | undefined }) => (
  <h1 class={styles.heading}>
    <RealmIcon realms={props.realms ?? []} /> {props.name}
  </h1>
);
