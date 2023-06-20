import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const getStoredItem = async (key: string, initialValue: T) => {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("ass hook lol", initialValue)
    getStoredItem(key, initialValue);
  }, [key]);

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
}
