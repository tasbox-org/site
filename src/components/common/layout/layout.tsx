import type { ParentComponent } from "solid-js";
import { Navbar } from "#components/common/navbar";
import "./layout.module.css";

export const Layout: ParentComponent = (props) => (
  <>
    <header>
      <Navbar />
    </header>
    <main id="main-content">{props.children}</main>
    <footer>This is a footer</footer>
  </>
);
