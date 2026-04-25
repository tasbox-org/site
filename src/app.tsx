import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { StyleRegistry } from "solid-styled";
import { FileRoutesPlus } from "#components/common/file-routes-plus";
import { Layout } from "#components/common/layout";
import { GlobalStyles } from "#theme/global-styles";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <StyleRegistry auto>
            <GlobalStyles />
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
