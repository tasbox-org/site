import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

const NotFound = () => (
  <>
    <Title>Not Found</Title>
    <HttpStatusCode code={404} />
    <div class="markdown-full">
      <h1>Page Not Found</h1>
      <p>
        We couldn't find a page at this address. Head to <a href="/">About</a> to read about what TASBox is,{" "}
        <a href="/docs/guides/introduction">Docs</a> to learn how to make games & addons, or <a href="/blog">Blog</a>{" "}
        for progress updates, technical deep dives and more.
      </p>
    </div>
  </>
);

export default NotFound;
