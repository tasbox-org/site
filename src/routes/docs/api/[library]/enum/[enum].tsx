import { useParams } from "@solidjs/router";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const EnumPage = () => {
  const params = useParams<PathParams["/api/[library]/enum/[enum]"]>();
  const enm = useDocEntry(
    () => params.library,
    "enums",
    () => params.enum,
  );

  return (
    <div>
      <RealmHeading realms={enm()?.realms} name={enm()?.name} />
      <Description value={enm()?.description} />
    </div>
  );
};

export default EnumPage;
