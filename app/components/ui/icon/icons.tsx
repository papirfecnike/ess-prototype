import type { ReactNode } from "react";

export const icons: Record<string, ReactNode> = {
  search: <path d="M21 21l-4.3-4.3a7 7 0 10-1.4 1.4L21 21z" />,
  filter: <path d="M3 5h18M6 12h12M10 19h4" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 13l4 4L19 7" />,
  close: <path d="M6 6l12 12M6 18L18 6" />,
  
  history: (
  <path d="M13 3a9 9 0 00-9 9H1l4 4 4-4H6a7 7 0 117 7 7.01 7.01 0 01-6.93-6H4.02A9 9 0 1013 3zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
),

  firstPage: (
  <>
    <path d="M11 12l5-5M11 12l5 5" />
    <path d="M6 6v12" />
  </>
),

lastPage: (
  <>
    <path d="M13 12l-5-5M13 12l-5 5" />
    <path d="M18 6v12" />
  </>
),
};

export type IconName = keyof typeof icons;
