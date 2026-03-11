import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import conversationsReducer from "../features/conversations/conversationsSlice";
import accountsReducer from "../features/accounts/accountsSlice";
import settingsReducer from "../features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    conversations: conversationsReducer,
    accounts: accountsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
