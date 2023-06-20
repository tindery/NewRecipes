import React from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

/**
 * ThemeContext
 * Provides Context for app theme
 * Uses Async Storage hook, to rememver the choice
 * Neat huh?
 */

export enum ETheme {
  'dark',
  'light',
}

export const ThemeContext = React.createContext<TThemeContext | null>(null);

const ThemeProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useAsyncStorage<ETheme>('theme', ETheme.light);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
