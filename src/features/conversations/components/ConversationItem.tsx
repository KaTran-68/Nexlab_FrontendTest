import type React from "react";
import type { Conversation } from "../../../types";
import { useAppSelector } from "../../../app/hooks";
import { t } from "../../../utils/i18n";
import { Avatar } from "../../../components";
import { formatConversationDate } from "../../../utils/formatDate";
import "./ConversationItem.css";

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  currentUserId,
  isActive,
  onClick,
}) => {
  const otherParticipant = conversation.participants.find(
    (p) => p.id !== currentUserId,
  );
  const accounts = useAppSelector((state) => state.accounts.list);
  const lang = useAppSelector((state) => state.settings.language);
  if (!otherParticipant) return null;

  const liveAccount = accounts.find((a) => a.id === otherParticipant.id);
  const otherUser = liveAccount
    ? { ...otherParticipant, status: liveAccount.status }
    : otherParticipant;

  const lastMsg = conversation.lastMessage;
  const subtitle = lastMsg
    ? lastMsg.senderId === currentUserId
      ? `${t("chat.you", lang)}: ${lastMsg.content}`
      : lastMsg.content
    : t("chat.noMessages", lang);

  return (
    <div
      className={`conversation-item ${isActive ? "conversation-item--active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <Avatar
        name={otherUser.name}
        avatar={otherUser.avatar}
        size="md"
        status={otherUser.status}
      />
      <div className="conversation-item__content">
        <div className="conversation-item__header">
          <span className="conversation-item__name">{otherUser.name}</span>
          {lastMsg && (
            <span className="conversation-item__time">
              {formatConversationDate(lastMsg.timestamp)}
            </span>
          )}
        </div>
        <div className="conversation-item__footer">
          <span className="conversation-item__last-msg">{subtitle}</span>
          {(conversation.unreadCount[currentUserId] ?? 0) > 0 && (
            <span className="conversation-item__badge">
              {conversation.unreadCount[currentUserId]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
