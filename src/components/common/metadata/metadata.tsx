import { Base, Meta, Title } from "@solidjs/meta";
import { For, Show } from "solid-js";
import { getUrl } from "#hooks/get-url";

interface MetadataProps {
  title: string;
  description: string;
  url: `/${string}`;
  image?: {
    url: `/${string}`;
    alt: string;
  };
}

export interface WebsiteMetadataProps extends MetadataProps {
  type: "website";
}

export interface ArticleMetadataProps extends MetadataProps {
  type: "article";
  authors: string[];
  tags: string[];
  publishedTime?: Date;
}

export const Metadata = (props: WebsiteMetadataProps | ArticleMetadataProps) => {
  const rootUrl = () => `${getUrl().origin}${props.url}`;
  const rootImageUrl = (imageUrl: string) => `${getUrl().origin}${imageUrl}`;

  return (
    <>
      <Title>{props.title} | TASBox</Title>
      <Meta name="description" content={props.description} />
      <Meta name="og:title" content={props.title} />
      <Meta name="og:description" content={props.description} />
      <Show when={props.image}>
        {/** biome-ignore lint/style/noNonNullAssertion: Narrowed by Show */}
        <Meta name="og:image" content={rootImageUrl(props.image!.url)} />
        {/** biome-ignore lint/style/noNonNullAssertion: Narrowed by Show */}
        <Meta name="og:image:alt" content={props.image!.alt} />
      </Show>
      <Meta name="og:url" content={rootUrl()} />
      <Meta name="og:site_name" content="TASBox" />
      <Meta name="og:type" content={props.type} />
      <Show when={props.type === "article"}>
        <For each={(props as ArticleMetadataProps).authors}>
          {(author) => <Meta name="article:author" content={author} />}
        </For>
        <For each={(props as ArticleMetadataProps).tags}>{(tag) => <Meta name="article:tag" content={tag} />}</For>
        <Show when={(props as ArticleMetadataProps).publishedTime}>
          <Meta name="article:published_time" content={(props as ArticleMetadataProps).publishedTime?.toISOString()} />
        </Show>
      </Show>
      <Base href={rootUrl()} />
    </>
  );
};
