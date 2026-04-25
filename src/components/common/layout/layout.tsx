import type { ParentComponent } from "solid-js";
import { Navbar } from "#components/common/navbar";
import styles from "./layout.module.css";

export const Layout: ParentComponent = (props) => (
  <>
    <header class={styles.header}>
      <Navbar />
    </header>
    <main id="main-content">{props.children}</main>
  </>
);
