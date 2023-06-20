import React from 'react';

import DiscoverRecipesProvider from './DiscoverRecipesProvider';
import DiscoverSettingsProvider from './DiscoverSettingsProvider';
import SavedRecipesProvider from './SavedRecipesProvider';
import ThemeProvider from './ThemeProvider';

export const AppContextProvider = ({children}: React.PropsWithChildren) => (
  <ThemeProvider>
    <DiscoverSettingsProvider>
      <DiscoverRecipesProvider>
        <SavedRecipesProvider>{children}</SavedRecipesProvider>
      </DiscoverRecipesProvider>
    </DiscoverSettingsProvider>
  </ThemeProvider>
);
