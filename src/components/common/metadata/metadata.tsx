import { Base, Meta, Title } from "@solidjs/meta";
import { For, Show } from "solid-js";
import { isServer } from "solid-js/web";
import { getUrl } from "#hooks/get-url";

interface MetadataProps {
  title?: string;
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
  const image = () => props.image ?? { url: "/img/social-card.png", alt: "TASBox logo" };

  const rootUrl = () => `${getUrl().origin}${props.url}`;
  const rootImageUrl = () => `${getUrl().origin}${image().url}`;

  const title = () => (props.title === undefined ? "TASBox" : `${props.title} | TASBox`);
  const ogTitle = () => props.title ?? "TASBox";

  // For some unknown reason, SolidMeta does not strip the server-side rendered <base/> tag when hydrating,
  // specifically on the dynamic docs page routes but not others.
  // This manually removes all SSR'd <base/> tags upon hydration
  if (!isServer) {
    document.querySelectorAll("base[data-sm]").forEach((element) => {
      element.remove();
    });
  }

  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={props.description} />

      <Meta name="og:title" content={ogTitle()} />
      <Meta name="og:description" content={props.description} />
      <Meta name="og:image" content={rootImageUrl()} />
      <Meta name="og:image:alt" content={image().alt} />
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

      <Meta name="twitter:card" content="summary_large_image" />

      <Base href={rootUrl()} />
    </>
  );
};
