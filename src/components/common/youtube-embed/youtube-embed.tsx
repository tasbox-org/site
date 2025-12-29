import { type Component } from "solid-js";

export interface YoutubeEmbedProps {
  videoId: string;
}

export const YoutubeEmbed: Component<YoutubeEmbedProps> = (props) => (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${props.videoId}`}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowfullscreen
  />
);
