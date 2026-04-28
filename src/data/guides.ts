import JsonGuides from "./guides.json" with { type: "json" };

interface Guide {
  breadcrumbs: readonly string[];
  path: string;
}

export const guides: Guide[] = JsonGuides;
