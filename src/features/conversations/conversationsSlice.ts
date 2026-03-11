import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation, User } from "../../types";
import { loadFromStorage, saveToStorage } from "../../utils/localStorage";

interface ConversationsState {
  list: Conversation[];
  searchQuery: string;
}

const savedConversations = loadFromStorage<Conversation[]>("conversations");

const initialState: ConversationsState = {
  list: savedConversations ?? [],
  searchQuery: "",
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    createConversation(
      state,
      action: PayloadAction<{ id: string; currentUser: User; otherUser: User }>,
    ) {
      const { id, currentUser, otherUser } = action.payload;
      const exists = state.list.find(
        (c) =>
          c.participants.some((p) => p.id === currentUser.id) &&
          c.participants.some((p) => p.id === otherUser.id),
      );
      if (exists) return;
      const newConv: Conversation = {
        id,
        participants: [currentUser, otherUser],
        lastMessage: null,
        unreadCount: {},
        updatedAt: new Date().toISOString(),
      };
      state.list.push(newConv);
      saveToStorage("conversations", state.list);
    },
    updateLastMessage(
      state,
      action: PayloadAction<{
        conversationId: string;
        message: Conversation["lastMessage"];
      }>,
    ) {
      const conv = state.list.find(
        (c) => c.id === action.payload.conversationId,
      );
      if (conv) {
        conv.lastMessage = action.payload.message;
        conv.updatedAt = action.payload.message?.timestamp ?? conv.updatedAt;
        saveToStorage("conversations", state.list);
      }
    },
    incrementUnread(
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>,
    ) {
      const conv = state.list.find(
        (c) => c.id === action.payload.conversationId,
      );
      if (conv) {
        const uid = action.payload.userId;
        conv.unreadCount[uid] = (conv.unreadCount[uid] ?? 0) + 1;
        saveToStorage("conversations", state.list);
      }
    },
    resetUnread(
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>,
    ) {
      const conv = state.list.find(
        (c) => c.id === action.payload.conversationId,
      );
      if (conv) {
        conv.unreadCount[action.payload.userId] = 0;
        saveToStorage("conversations", state.list);
      }
    },
  },
});

export const {
  setSearchQuery,
  createConversation,
  updateLastMessage,
  incrementUnread,
  resetUnread,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
