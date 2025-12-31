export type SearchResult = {
  id: string;
  title: string;
  description?: string;
  route: string;
  section: string; // inventory, outbound, etc.
};
