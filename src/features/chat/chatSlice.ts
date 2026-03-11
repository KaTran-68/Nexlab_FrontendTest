import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../../types";
import { loadFromStorage, saveToStorage } from "../../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

interface ChatState {
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
}

const savedMessages = loadFromStorage<Record<string, Message[]>>("messages");

const initialState: ChatState = {
  messages: savedMessages ?? {},
  activeConversationId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation(state, action: PayloadAction<string | null>) {
      state.activeConversationId = action.payload || null;
    },
    sendMessage(
      state,
      action: PayloadAction<{
        conversationId: string;
        senderId: string;
        content: string;
      }>,
    ) {
      const { conversationId, senderId, content } = action.payload;
      const newMessage: Message = {
        id: uuidv4(),
        conversationId,
        senderId,
        content,
        timestamp: new Date().toISOString(),
        status: "sent",
      };

      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(newMessage);
      saveToStorage("messages", state.messages);
    },
    receiveMessage(state, action: PayloadAction<Message>) {
      const msg = action.payload;
      if (!state.messages[msg.conversationId]) {
        state.messages[msg.conversationId] = [];
      }
      state.messages[msg.conversationId].push(msg);
      saveToStorage("messages", state.messages);
    },
  },
});

export const { setActiveConversation, sendMessage, receiveMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
