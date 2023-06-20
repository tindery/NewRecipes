// context/todoContext.tsx
import React from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

/**
 * DiscoverSettingsContext
 * Handles settings used for discover que
 * Settings are saved into Async Storage using a hook
 */

export const DiscoverSettingsContext =
  React.createContext<TDiscoverSettingsContext | null>(null);

const DiscoverSettingsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [discoverSettings, setDiscoverSettings] =
    useAsyncStorage<TDiscoverSettings>('discoverSettings', {});

  const setSettings = (
    key: keyof TDiscoverSettings,
    value: TDiscoverSettings[typeof key],
  ) => {
    console.log("! NEW SETTINGS", key)
    if (!key || !value) {
      throw new Error(
        'DiscoverSettingsContext: setSettings error: key, or value not defined! Key: ' +
          key +
          ', value: ' +
          value,
      );
    }
    setDiscoverSettings({...discoverSettings, [key]: value});
  };
  //console.log("discover settings render")
  return (
    <DiscoverSettingsContext.Provider
      value={{discoverSettings, setSettings}}>
      {children}
    </DiscoverSettingsContext.Provider>
  );
};

export default DiscoverSettingsProvider;
