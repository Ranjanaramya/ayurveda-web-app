'use client';

import React, { createContext, useContext, useState } from 'react';

interface CmsContextType {
  dataVersion: number;
  triggerRefresh: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [dataVersion, setDataVersion] = useState(0);

  const triggerRefresh = () => {
    setDataVersion((prev) => prev + 1);
  };

  return (
    <CmsContext.Provider value={{ dataVersion, triggerRefresh }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (context === undefined) {
    // Return a default fallback if not wrapped (for testing or SSR static page gen)
    return { dataVersion: 0, triggerRefresh: () => {} };
  }
  return context;
}
