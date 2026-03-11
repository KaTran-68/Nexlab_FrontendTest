import type React from "react";
import type { Message } from "../../../types";
import { Avatar } from "../../../components";
import { formatMessageTime } from "../../../utils/formatDate";
import "./MessageItem.css";

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isOwn,
  senderName,
}) => {
  return (
    <div
      className={`message-item ${isOwn ? "message-item--own" : "message-item--other"}`}
    >
      {!isOwn && <Avatar name={senderName} size="sm" />}
      <div className="message-item__bubble">
        <p className="message-item__text">{message.content}</p>
        <span className="message-item__time">
          {formatMessageTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
