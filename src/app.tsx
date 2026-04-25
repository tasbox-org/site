import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { FileRoutesPlus } from "#components/common/file-routes-plus";
import { Layout } from "#components/common/layout";
import "#theme/global-styles";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Layout>
            <Suspense>{props.children}</Suspense>
          </Layout>
        </MetaProvider>
      )}
    >
      {/* @ts-expect-error */}
      <FileRoutesPlus />
    </Router>
  );
}
