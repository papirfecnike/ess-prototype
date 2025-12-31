export type Column = {
  key: string;
  label: string;
  width?: string;
  selectable?: boolean;
};

export type Row = {
  id: string;
  [key: string]: string | boolean;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};
