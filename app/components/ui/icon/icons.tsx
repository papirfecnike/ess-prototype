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

  checkStroke: (
    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  minusStroke: (
    <path d="M6 12h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),

  moreVert: (
    <path d="M12 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" />
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