import { Title } from "@solidjs/meta";
import { Component } from "solid-js";
import { event } from "@tasbox-org/docs";

const Docs: Component = () => (
  <main>
    <Title>TASBox Docs</Title>
    <pre>
      <code>{JSON.stringify(event, null, 2)}</code>
    </pre>
  </main>
);

export default Docs;
