export interface Tag {
  slug: string;
  label: string;
  description: string;
}

export const tags: Tag[] = [
  {
    slug: "developer-preview",
    label: "Developer Preview",
    description: "Updates and information regarding the Closed Developer Preview",
  },
  {
    slug: "closed-playtest",
    label: "Closed Playtest",
    description: "Updates and information regarding the Closed Playtest",
  },
  {
    slug: "release",
    label: "Public Release",
    description: "Updates and information regarding the Public Release of TASBox",
  },
  {
    slug: "monthly-updates",
    label: "Monthly Updates",
    description: "Updates covering everything that's happened in TASBox each month",
  },
  { slug: "renderer", label: "Renderer", description: "Posts about TASBox's renderer" },
  { slug: "lua-api", label: "Lua API", description: "Posts about TASBox's Lua API" },
];
