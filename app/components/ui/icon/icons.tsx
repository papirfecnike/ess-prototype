import type { ReactNode } from "react";

export const icons: Record<string, ReactNode> = {
  search: <path d="M21 21l-4.3-4.3a7 7 0 10-1.4 1.4L21 21z" />,
  filter: <path d="M3 5h18M6 12h12M10 19h4" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 13l4 4L19 7" />,
  close: <path d="M6 6l12 12M6 18L18 6" />,
};

export type IconName = keyof typeof icons;
