import { useParams } from "@solidjs/router";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const FunctionPage = () => {
  const params = useParams<PathParams["/api/[library]/function/[function]"]>();
  const func = useDocEntry(
    () => params.library,
    "functions",
    () => params.function,
  );

  return (
    <div>
      <RealmHeading realms={func()?.realms} name={func()?.name} />
      <Description value={func()?.description} />
    </div>
  );
};

export default FunctionPage;
