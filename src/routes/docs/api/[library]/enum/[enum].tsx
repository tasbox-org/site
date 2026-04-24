import { useParams } from "@solidjs/router";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const EnumPage = () => {
  const params = useParams<PathParams["/api/[library]/enum/[enum]"]>();
  const enm = useDocEntry(params.library, "enums", params.enum);

  return <div>Class: {JSON.stringify(enm(), null, 2)}</div>;
};

export default EnumPage;
