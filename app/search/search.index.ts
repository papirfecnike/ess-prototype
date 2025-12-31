import { navigationIndex } from "./navigation.index";
import { contentIndex } from "./content.index";
import type { SearchResult } from "./search.types";

export const searchIndex: SearchResult[] = [
  ...navigationIndex,
  ...contentIndex,
];
