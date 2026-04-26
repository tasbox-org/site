import { useParams } from "@solidjs/router";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const ClassPage = () => {
  const params = useParams<PathParams["/api/[library]/class/[class]"]>();
  const cls = useDocEntry(
    () => params.library,
    "classes",
    () => params.class,
  );

  return (
    <div>
      <RealmHeading realms={cls()?.realms} name={cls()?.name} />
      <Description value={cls()?.description} />
    </div>
  );
};

export default ClassPage;
