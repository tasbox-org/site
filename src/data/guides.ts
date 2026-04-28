import JsonGuides from "./guides.json" with { type: "json" };

interface Guide {
  breadcrumbs: readonly string[];
  href: string;
}

export const guides: Guide[] = JsonGuides;
