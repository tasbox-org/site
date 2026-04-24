import type { RouteSectionProps } from "@solidjs/router";

const LibraryLayout = (props: RouteSectionProps) => {
  return (
    <div>
      <div>Library layout</div>
      {props.children}
    </div>
  );
};

export default LibraryLayout;
