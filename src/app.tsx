import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { StyleRegistry } from "solid-styled";
import { FileRoutesPlus } from "#components/common/file-routes-plus";
import { Layout } from "#components/common/layout";
import { CssReset } from "#theme/css-reset";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <StyleRegistry auto>
            <CssReset />
            <Layout>
              <Suspense>{props.children}</Suspense>
            </Layout>
          </StyleRegistry>
        </MetaProvider>
      )}
    >
      {/* @ts-expect-error */}
      <FileRoutesPlus />
    </Router>
  );
}
