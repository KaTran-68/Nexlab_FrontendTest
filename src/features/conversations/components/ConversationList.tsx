import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { setSearchQuery, createConversation } from "../conversationsSlice";
import { setActiveConversation } from "../../chat/chatSlice";
import { resetUnread } from "../conversationsSlice";
import { Avatar } from "../../../components";
import { t } from "../../../utils/i18n";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "./SearchBar";
import ConversationItem from "./ConversationItem";
import "./ConversationList.css";

/** Returns true if query matches the start of any word in `name` */
const matchesWordStart = (name: string, query: string): boolean => {
  if (!query) return true;
  const q = query.toLowerCase();
  return name
    .toLowerCase()
    .split(/\s+/)
    .some((word) => word.startsWith(q));
};

const ConversationList = () => {
  const dispatch = useAppDispatch();
  const { list, searchQuery } = useAppSelector((state) => state.conversations);
  const currentUser = useAppSelector((state) => state.auth.user);
  const accounts = useAppSelector((state) => state.accounts.list);
  const activeConversationId = useAppSelector(
    (state) => state.chat.activeConversationId,
  );
  const lang = useAppSelector((state) => state.settings.language);

  const myConversations = list
    .filter((conv) => conv.participants.some((p) => p.id === currentUser?.id))
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  const filteredConversations = myConversations.filter((conv) => {
    if (!searchQuery) return true;
    const otherUser = conv.participants.find((p) => p.id !== currentUser?.id);
    return otherUser ? matchesWordStart(otherUser.name, searchQuery) : false;
  });

  const existingPartnerIds = new Set(
    myConversations.flatMap((conv) =>
      conv.participants
        .filter((p) => p.id !== currentUser?.id)
        .map((p) => p.id),
    ),
  );

  const newContactMatches = accounts.filter(
    (acc) =>
      acc.id !== currentUser?.id &&
      !existingPartnerIds.has(acc.id) &&
      matchesWordStart(acc.name, searchQuery),
  );

  const handleSelectConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId));
    if (currentUser) {
      dispatch(resetUnread({ conversationId, userId: currentUser.id }));
    }
  };

  const handleStartConversation = (otherUser: (typeof accounts)[number]) => {
    if (!currentUser) return;
    const existing = list.find(
      (c) =>
        c.participants.some((p) => p.id === currentUser.id) &&
        c.participants.some((p) => p.id === otherUser.id),
    );
    if (existing) {
      dispatch(setActiveConversation(existing.id));
    } else {
      const newId = uuidv4();
      dispatch(createConversation({ id: newId, currentUser, otherUser }));
      dispatch(setActiveConversation(newId));
    }
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="conversation-list">
      <div className="conversation-list__header">
        <h2 className="conversation-list__title">{t("chat.title", lang)}</h2>
      </div>
      <SearchBar
        value={searchQuery}
        onChange={(val) => dispatch(setSearchQuery(val))}
      />
      <div className="conversation-list__items">
        {filteredConversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            currentUserId={currentUser?.id ?? ""}
            isActive={conv.id === activeConversationId}
            onClick={() => handleSelectConversation(conv.id)}
          />
        ))}
        {newContactMatches.map((acc) => (
          <button
            key={acc.id}
            className="conversation-list__new-contact"
            onClick={() => handleStartConversation(acc)}
          >
            <Avatar name={acc.name} size="md" status={acc.status} />
            <div className="conversation-list__new-contact-info">
              <span className="conversation-list__new-contact-name">
                {acc.name}
              </span>
              <span className="conversation-list__new-contact-hint">
                {t("conv.startChat", lang)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
