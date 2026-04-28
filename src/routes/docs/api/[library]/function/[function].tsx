import { useParams } from "@solidjs/router";
import { For } from "solid-js";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import type { PathParams } from "#types/path-params";
import { useDocEntries } from "#hooks/use-doc-entries";

const FunctionPage = () => {
  const params = useParams<PathParams["/api/[library]/function/[function]"]>();
  const functions = useDocEntries(
    () => params.library,
    "functions",
    () => params.function,
  );

  return (
    <For each={functions() ?? []}>
      {(func) => (
        <div>
          <RealmHeading realms={func.realms} name={func.name} />
          <Description value={func.description} />
        </div>
      )}
    </For>
  );
};

export default FunctionPage;
