import type { ReactNode } from "react";

export const icons: Record<string, ReactNode> = {
  search: <path d="M21 21l-4.3-4.3a7 7 0 10-1.4 1.4L21 21z" />,

  filter: <path d="M3 5h18M6 12h12M10 19h4" />,

  chevronDown: <path d="M6 9l6 6 6-6" />,

  chevronDownStroke: (
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  /* =========================
     CHECKBOX ICONS
     ========================= */

  checkStroke: (
    <path
      d="M5 13l4 4L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  minusStroke: (
    <path
      d="M6 12h12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),

  /* =========================
     ACTION / MENU ICONS
     ========================= */

  moreVert: (
    <path
      d="M12 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),

  /* =========================
     OTHER ICONS
     ========================= */

  close: <path d="M6 6l12 12M6 18L18 6" />,

  closeStroke: (
    <path
      d="M6 6l12 12M6 18L18 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  ),

  history: (
    <path d="M13 3a9 9 0 00-9 9H1l4 4 4-4H6a7 7 0 117 7 7.01 7.01 0 01-6.93-6H4.02A9 9 0 1013 3zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  ),

  delete: (
    <path d="M6 7h12M9 7V5h6v2M10 11v6M14 11v6M5 7l1 14h12l1-14" />
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

  widthNormal: (
    <g transform="translate(12 12) scale(0.75) translate(-12 -12)">
      <path
        d="M5 6h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 18h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 6v12M15 6v12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  ),

  qrScanner: (
    <>
      <path
        d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 12h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </>
  ),

  forklift: (
    <>
      <path
        d="M6 4v16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 14h8l3 4h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 18h4M17 16h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="19" r="1.5" fill="currentColor" />
      <circle cx="15" cy="19" r="1.5" fill="currentColor" />
    </>
  ),

  /* =========================
     VERSION HISTORY ICONS
     ========================= */

  save: (
    <>
      <path d="M5 3h12l4 4v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path d="M7 3v6h10V3" />
      <path d="M12 13v6" />
      <path d="M9 16h6" />
    </>
  ),

  refresh: (
    <path
      d="M4 4v6h6M20 20v-6h-6M6.5 17.5a7 7 0 0011-1.5M17.5 6.5a7 7 0 00-11 1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  rocket: (
    <>
      <path
        d="M12 2c3 2 6 6 6 10l-6 2-6-2c0-4 3-8 6-10z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M12 14v6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    </>
  ),
};

export type IconName = keyof typeof icons;
