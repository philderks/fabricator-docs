'use client';

import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import FabricatorSearchDialog from '@/components/search';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog: FabricatorSearchDialog }}
      theme={{ attribute: 'class', defaultTheme: 'dark', enableSystem: false }}
    >
      {children}
    </RootProvider>
  );
}
