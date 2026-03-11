export type Language = "vi" | "en";

const translations = {
  "picker.title": { vi: "Chọn tài khoản", en: "Choose account" },
  "picker.subtitle": {
    vi: "Chọn tài khoản để bắt đầu chat",
    en: "Select an account to start chatting",
  },
  "picker.inputPlaceholder": {
    vi: "Nhập tên tài khoản",
    en: "Enter account name",
  },
  "picker.addBtn": { vi: "Thêm", en: "Add" },

  "nav.properties": { vi: "Bất động sản", en: "Properties" },
  "nav.chat": { vi: "Trò chuyện", en: "Chat" },
  "nav.calendar": { vi: "Lịch", en: "Calendar" },
  "nav.offers": { vi: "Ưu đãi", en: "Offers" },
  "nav.documents": { vi: "Tài liệu", en: "Documents" },
  "nav.settings": { vi: "Cài đặt", en: "Settings" },
  "nav.logout": { vi: "Đăng xuất", en: "Logout" },

  "chat.title": { vi: "Trò chuyện", en: "Chat" },
  "chat.placeholder": {
    vi: "Chọn cuộc trò chuyện để bắt đầu",
    en: "Select a conversation to start chatting",
  },
  "chat.inputPlaceholder": {
    vi: "Nhập tin nhắn...",
    en: "Type a message...",
  },
  "chat.requestVisit": { vi: "Yêu cầu thăm", en: "Request Visit" },
  "chat.makeOffer": { vi: "Đề xuất", en: "Make Offer" },
  "chat.online": { vi: "Trực tuyến", en: "Online" },
  "chat.offline": { vi: "Ngoại tuyến", en: "Offline" },
  "chat.noMessages": { vi: "Chưa có tin nhắn", en: "No messages yet" },
  "chat.you": { vi: "Bạn", en: "You" },

  "search.placeholder": { vi: "Tìm kiếm", en: "Search" },

  "conv.startChat": {
    vi: "Bắt đầu cuộc trò chuyện",
    en: "Start a conversation",
  },

  "settings.title": { vi: "Cài đặt", en: "Settings" },
  "settings.theme": { vi: "Giao diện", en: "Theme" },
  "settings.light": { vi: "Sáng", en: "Light" },
  "settings.dark": { vi: "Tối", en: "Dark" },
  "settings.language": { vi: "Ngôn ngữ", en: "Language" },
  "settings.vietnamese": { vi: "Tiếng Việt", en: "Vietnamese" },
  "settings.english": { vi: "Tiếng Anh", en: "English" },
  "settings.rename": { vi: "Đổi tên", en: "Rename" },
  "settings.rename_placeholder": {
    vi: "Nhập tên mới...",
    en: "Enter new name...",
  },
  "settings.rename_save": { vi: "Lưu", en: "Save" },

  "status.sale": { vi: "Bán", en: "Sale" },
  "status.label": { vi: "Trạng thái", en: "Status" },
} as const;

export type TranslationKey = keyof typeof translations;

export const t = (key: TranslationKey, lang: Language): string => {
  return translations[key]?.[lang] ?? key;
};
