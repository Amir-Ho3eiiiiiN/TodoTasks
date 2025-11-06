import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialState: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialState;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
