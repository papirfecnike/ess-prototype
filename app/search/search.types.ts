export type SearchResultType =
  | "main-nav"
  | "sub-nav"
  | "content";

export type SearchResult = {
  id: string;
  title: string;
  description?: string;
  route: string;
  section: string; // inventory, outbound, etc.
  type: SearchResultType;
};
