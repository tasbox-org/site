import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { MaxContentWidth } from "#components/common/max-content-width";

const NotFound = () => (
  <>
    <Title>Not Found</Title>
    <HttpStatusCode code={404} />
    <MaxContentWidth>
      <div class="markdown-full">
        <h1>Page Not Found</h1>
        <p>
          We couldn't find a page at this address. Head to <A href="/">About</A> to read about what TASBox is,{" "}
          <A href="/docs/guides/introduction">Docs</A> to learn how to make games & addons, or <A href="/blog">Blog</A>{" "}
          for progress updates, technical deep dives and more.
        </p>
      </div>
    </MaxContentWidth>
  </>
);

export default NotFound;
