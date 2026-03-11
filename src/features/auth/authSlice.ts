import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";
import {
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from "../../utils/localStorage";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const savedUser = loadFromStorage<User>("currentUser");

const initialState: AuthState = {
  user: savedUser ?? null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveToStorage("currentUser", action.payload);
    },
    updateStatus(state, action: PayloadAction<User["status"]>) {
      if (state.user) {
        state.user.status = action.payload;
        saveToStorage("currentUser", state.user);
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      removeFromStorage("currentUser");
    },
    renameUser(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.name = action.payload;
        saveToStorage("currentUser", state.user);
      }
    },
  },
});

export const { setUser, updateStatus, logout, renameUser } = authSlice.actions;
export default authSlice.reducer;
