'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return (
    <>
      <style jsx global>{`
        /* Hide Sanity Studio top navbar header, popovers, and ads */
        header[data-ui="Navbar"],
        [data-testid="studio-navbar"],
        header,
        div[data-ui="Popover"],
        div[data-ui="Toast"],
        button[aria-label*="Search"],
        button[aria-label*="Create"],
        button[aria-label*="Help"],
        div[class*="whats-new"] {
          display: none !important;
        }
      `}</style>
      <NextStudio config={config} />
    </>
  );
}
