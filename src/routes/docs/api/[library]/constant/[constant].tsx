import { useParams } from "@solidjs/router";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const ConstantPage = () => {
  const params = useParams<PathParams["/api/[library]/constant/[constant]"]>();
  const constant = useDocEntry(
    () => params.library,
    "constants",
    () => params.constant,
  );

  return (
    <div>
      <RealmHeading realms={constant()?.realms} name={constant()?.name.toString()} />
      <Description value={constant()?.description} />
    </div>
  );
};

export default ConstantPage;
