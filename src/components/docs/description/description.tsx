import { Markdown } from "#components/common/markdown";

export const Description = (props: { value: string | string[] | undefined }) => {
  const description = () => (Array.isArray(props.value) ? props.value.join("\n") : (props.value ?? ""));

  return <Markdown>{description()}</Markdown>;
};
