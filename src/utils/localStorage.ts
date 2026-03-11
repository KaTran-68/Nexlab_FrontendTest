const PREFIX = "chatapp_";

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(PREFIX + key, serialized);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const serialized = localStorage.getItem(PREFIX + key);
    if (serialized === null) return null;
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(PREFIX + key);
};
