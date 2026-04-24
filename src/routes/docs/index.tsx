import { Title } from "@solidjs/meta";
import { event } from "@tasbox-org/docs";
import type { Component } from "solid-js";

const Docs: Component = () => (
  <>
    <Title>TASBox Docs</Title>
    <pre>
      <code>{JSON.stringify(event, null, 2)}</code>
    </pre>
  </>
);

export default Docs;
