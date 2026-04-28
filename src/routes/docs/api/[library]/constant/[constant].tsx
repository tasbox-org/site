import { useParams } from "@solidjs/router";
import { For } from "solid-js";
import { CodeBlock } from "#components/common/code-block/code-block";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { renderType } from "#helpers/render-type";
import { useDocEntries } from "#hooks/use-doc-entries";
import type { PathParams } from "#types/path-params";

const ConstantPage = () => {
  const params = useParams<PathParams["/api/[library]/constant/[constant]"]>();
  const constants = useDocEntries(
    () => params.library,
    "constants",
    () => params.constant,
  );

  return (
    <For each={constants() ?? []}>
      {(constant) => (
        <div>
          <RealmHeading realms={constant.realms} name={constant.name.toString()} />
          <Description value={constant.description} />
          <CodeBlock language="moonjuice">{`${constant.name}: ${renderType(constant.type)}${constant.optional ? "?" : ""}`}</CodeBlock>
        </div>
      )}
    </For>
  );
};

export default ConstantPage;
