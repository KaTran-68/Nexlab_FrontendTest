import type React from "react";
import { useState, useRef, type FormEvent } from "react";
import { useAppSelector } from "../../../app/hooks";
import { t } from "../../../utils/i18n";
import EmojiPicker from "./EmojiPicker";
import "./MessageInput.css";

interface MessageInputProps {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lang = useAppSelector((state) => state.settings.language);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleEmojiSelect = (emoji: string) => {
    setText((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="message-input__wrapper">
      <form className="message-input" onSubmit={handleSubmit}>
        <EmojiPicker onSelect={handleEmojiSelect} />
        <input
          ref={inputRef}
          type="text"
          className="message-input__field"
          placeholder={t("chat.inputPlaceholder", lang)}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className="message-input__icon-btn"
          title="Attach"
        >
          <i className="fas fa-paperclip" />
        </button>
        <button type="submit" className="message-input__send-btn" title="Send">
          <i className="fas fa-paper-plane" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
