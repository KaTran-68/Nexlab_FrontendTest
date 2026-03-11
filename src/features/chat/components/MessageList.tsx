import type React from "react";
import { useEffect, useRef } from "react";
import type { Message, User } from "../../../types";
import MessageItem from "./MessageItem";
import "./MessageList.css";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  participants: User[];
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  participants,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const getSenderName = (senderId: string): string => {
    const user = participants.find((p) => p.id === senderId);
    return user?.name ?? "Unknown";
  };

  return (
    <div className="message-list" ref={listRef}>
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isOwn={msg.senderId === currentUserId}
          senderName={getSenderName(msg.senderId)}
        />
      ))}
    </div>
  );
};

export default MessageList;
