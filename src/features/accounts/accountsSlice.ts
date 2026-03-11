import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserStatus } from "../../types";
import { loadFromStorage, saveToStorage } from "../../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

interface AccountsState {
  list: User[];
}

const defaultAccounts: User[] = [
  { id: "user-me", name: "Jimi Hendrix", avatar: "", status: "offline" },
  { id: "user-1", name: "Muiz amar", avatar: "", status: "offline" },
];

const savedAccounts = loadFromStorage<User[]>("accounts");

const initialState: AccountsState = {
  list: savedAccounts ?? defaultAccounts,
};

if (!savedAccounts) {
  saveToStorage("accounts", defaultAccounts);
}

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount(state, action: PayloadAction<string>) {
      const name = action.payload.trim();
      if (!name) return;
      const newUser: User = {
        id: uuidv4(),
        name,
        avatar: "",
        status: "offline",
      };
      state.list.push(newUser);
      saveToStorage("accounts", state.list);
    },
    updateAccountStatus(
      state,
      action: PayloadAction<{ id: string; status: UserStatus }>,
    ) {
      const account = state.list.find((a) => a.id === action.payload.id);
      if (account) {
        account.status = action.payload.status;
        saveToStorage("accounts", state.list);
      }
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.list = state.list.filter((a) => a.id !== action.payload);
      saveToStorage("accounts", state.list);
    },
    renameAccount(state, action: PayloadAction<{ id: string; name: string }>) {
      const account = state.list.find((a) => a.id === action.payload.id);
      if (account) {
        account.name = action.payload.name;
        saveToStorage("accounts", state.list);
      }
    },
  },
});

export const { addAccount, updateAccountStatus, removeAccount, renameAccount } =
  accountsSlice.actions;
export default accountsSlice.reducer;
