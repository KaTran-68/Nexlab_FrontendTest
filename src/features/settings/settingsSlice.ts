import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Language } from "../../utils/i18n";
import { loadFromStorage, saveToStorage } from "../../utils/localStorage";

export type Theme = "light" | "dark";

interface SettingsState {
  theme: Theme;
  language: Language;
}

const savedSettings = loadFromStorage<SettingsState>("settings");

const initialState: SettingsState = savedSettings ?? {
  theme: "light",
  language: "vi",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      saveToStorage("settings", state);
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
      saveToStorage("settings", state);
    },
  },
});

export const { setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
