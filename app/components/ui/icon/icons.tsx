import type { ReactNode } from "react";

export const icons = {
  search: (
    <path d="M21 21l-4.3-4.3a7 7 0 10-1.4 1.4L21 21z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  ),
  filter: (
    <path d="M3 5h18M6 12h12M10 19h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  ),
  chevronDown: (
    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevronDownStroke: (
    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevronLeftStroke: (
    <path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevronRightStroke: (
    <path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevronUpStroke: (
    <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
  closeStroke: (
    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  ),

  checkStroke: (
    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  minusStroke: (
    <path d="M6 12h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),

  moreVert: (
    <path d="M12 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
  ),
  dragIndicator: (
    <>
      <circle cx="9" cy="5" r="1.4" fill="currentColor" />
      <circle cx="15" cy="5" r="1.4" fill="currentColor" />
      <circle cx="9" cy="12" r="1.4" fill="currentColor" />
      <circle cx="15" cy="12" r="1.4" fill="currentColor" />
      <circle cx="9" cy="19" r="1.4" fill="currentColor" />
      <circle cx="15" cy="19" r="1.4" fill="currentColor" />
    </>
  ),
  close: (
    <path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  ),
  add: (
    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  ),
  delete: (
    <>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7l1-3h4l1 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  edit: (
    <path d="M4 17.5V20h2.5L18 8.5 15.5 6 4 17.5zM14 7l2.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  download: (
    <path d="M12 4v10M8 10l4 4 4-4M5 20h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),

  settings: (
    <>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  barChart: (
    <path d="M5 9v10M10 5v14M15 12v7M20 3v16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  ),

  rocket: (
    <>
      <path d="M12 2c3 2 6 6 6 10l-6 2-6-2c0-4 3-8 6-10z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    </>
  ),

  profile: (
    <>
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20a7 7 0 0114 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),

  forklift: (
    <>
      <path d="M6 4v12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 14h7l3 4h4" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),

  history: (
    <path d="M3 12a9 9 0 109-9" fill="none" stroke="currentColor" strokeWidth="1.5" />
  ),

  warning: (
    <path d="M12 2l10 18H2L12 2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
  ),
  alertTriangle: (
    <>
      <path d="M12 3l9 17H3L12 3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9v5M12 17h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v6M12 17h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11v6M12 7h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),

  checkCircle: (
    <>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" fill="none" />
    </>
  ),

  security: (
    <path d="M12 1l9 4v6c0 5.25-3.66 10.74-9 12-5.34-1.26-9-6.75-9-12V5l9-4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
  ),

  flag: (
    <path d="M4 4v16M4 4h10l-2 4 2 4H4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  ),

  inventory: (
    <>
      <rect x="3" y="4" width="18" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="18" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  inventory2: (
    <>
      <path d="M4 7l8-4 8 4-8 4-8-4z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 7v10l8 4 8-4V7M12 11v10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  widthNormal: (
    <path d="M4 6h16v12H4V6zM8 9v6M16 9v6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  time: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20a7 7 0 0114 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  refresh: (
    <path d="M20 7v5h-5M4 17v-5h5M18 10a6 6 0 00-10-4.5L4 9m2 5a6 6 0 0010 4.5L20 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  save: (
    <path d="M5 4h12l2 2v14H5V4zM8 4v6h8V4M8 20v-6h8v6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  ),
  print: (
    <>
      <path d="M7 8V4h10v4M7 17H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 14h10v6H7v-6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  qrScanner: (
    <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M8 8h2v2H8V8zM14 8h2v2h-2V8zM8 14h2v2H8v-2zM14 14h2v2h-2v-2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  barcode: (
    <path d="M4 6v12M7 6v12M11 6v12M14 6v12M20 6v12M17 6v12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  archive: (
    <path d="M4 5h16v4H4V5zM6 9v10h12V9M10 13h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  inbox: (
    <path d="M4 4h16l-2 10h-4a2 2 0 01-4 0H6L4 4zM4 14v6h16v-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  ),
  activity: (
    <path d="M3 12h4l3-7 4 14 3-7h4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  arrowUpward: (
    <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  arrowDownward: (
    <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  firstPage: (
    <path d="M6 5v14M18 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  lastPage: (
    <path d="M18 5v14M6 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),

  rule: (
    <>
      <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="12" r="2" fill="currentColor" />
    </>
  ),

  timeline: (
    <>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
} as const;

export type IconName = keyof typeof icons;
