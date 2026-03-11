import type React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { sendMessage } from "../chatSlice";
import {
  updateLastMessage,
  incrementUnread,
} from "../../conversations/conversationsSlice";
import { t } from "../../../utils/i18n";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";

interface ChatWindowProps {
  onBack?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onBack }) => {
  const dispatch = useAppDispatch();
  const activeConversationId = useAppSelector(
    (state) => state.chat.activeConversationId,
  );
  const messages = useAppSelector((state) =>
    activeConversationId
      ? (state.chat.messages[activeConversationId] ?? [])
      : [],
  );
  const conversations = useAppSelector((state) => state.conversations.list);
  const currentUser = useAppSelector((state) => state.auth.user);
  const lang = useAppSelector((state) => state.settings.language);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  if (!activeConversation || !currentUser) {
    return (
      <div className="chat-window chat-window--empty">
        <div className="chat-window__placeholder">
          <i className="fas fa-comments chat-window__placeholder-icon" />
          <p>{t("chat.placeholder", lang)}</p>
        </div>
      </div>
    );
  }

  const otherUser = activeConversation.participants.find(
    (p) => p.id !== currentUser.id,
  );
  if (!otherUser) return null;

  const handleSend = (content: string) => {
    dispatch(
      sendMessage({
        conversationId: activeConversation.id,
        senderId: currentUser.id,
        content,
      }),
    );

    dispatch(
      updateLastMessage({
        conversationId: activeConversation.id,
        message: {
          id: Date.now().toString(),
          conversationId: activeConversation.id,
          senderId: currentUser.id,
          content,
          timestamp: new Date().toISOString(),
          status: "sent",
        },
      }),
    );

    dispatch(
      incrementUnread({
        conversationId: activeConversation.id,
        userId: otherUser.id,
      }),
    );
  };

  return (
    <div className="chat-window">
      <ChatHeader otherUser={otherUser} onBack={onBack} />
      <MessageList
        messages={messages}
        currentUserId={currentUser.id}
        participants={activeConversation.participants}
      />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
