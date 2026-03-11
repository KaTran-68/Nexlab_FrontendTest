import type React from "react";
import type { User } from "../../../types";
import { useAppSelector } from "../../../app/hooks";
import { t } from "../../../utils/i18n";
import { Avatar } from "../../../components";
import "./ChatHeader.css";

interface ChatHeaderProps {
  otherUser: User;
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ otherUser, onBack }) => {
  const lang = useAppSelector((state) => state.settings.language);
  const accounts = useAppSelector((state) => state.accounts.list);
  const liveAccount = accounts.find((a) => a.id === otherUser.id);
  const status = liveAccount ? liveAccount.status : otherUser.status;

  return (
    <div className="chat-header">
      <div className="chat-header__info">
        {onBack && (
          <button className="chat-header__back-btn" onClick={onBack}>
            <i className="fas fa-arrow-left" />
          </button>
        )}
        <Avatar
          name={otherUser.name}
          avatar={otherUser.avatar}
          size="md"
          status={status}
        />
        <div className="chat-header__text">
          <h3 className="chat-header__name">{otherUser.name}</h3>
          <span className={`chat-header__status--${status}`}>
            {status === "online"
              ? t("chat.online", lang)
              : t("chat.offline", lang)}
          </span>
        </div>
      </div>
      <div className="chat-header__actions">
        <span className="chat-header__label">
          {t("status.label", lang)}: <strong>{t("status.sale", lang)}</strong>
        </span>
        <button className="chat-header__btn" title="Notifications">
          <i className="fas fa-bell" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
