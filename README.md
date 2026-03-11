# Chat App

Ứng dụng chat real-time được xây dựng với React, TypeScript và Vite. Hỗ trợ đa tài khoản, đa ngôn ngữ, giao diện sáng/tối và responsive trên mọi thiết bị.

---

## Công nghệ sử dụng

| Công nghệ            | Phiên bản | Mô tả                   |
| -------------------- | --------- | ----------------------- |
| **React**            | 19.2      | Thư viện UI             |
| **TypeScript**       | 5.9       | Type safety             |
| **Vite**             | 7.3       | Build tool & dev server |
| **Redux Toolkit**    | 2.11      | Quản lý state toàn cục  |
| **React Redux**      | 9.2       | Kết nối Redux với React |
| **React Router DOM** | 7.13      | Điều hướng              |
| **FontAwesome**      | 7.2       | Bộ icon                 |
| **UUID**             | 13.0      | Sinh ID duy nhất        |
| **Axios**            | 1.13      | HTTP client             |
| **ESLint**           | 9.39      | Kiểm tra code           |

---

## Kỹ thuật & Pattern

### State Management (Redux Toolkit)

Ứng dụng sử dụng **5 Redux slices**:

| Slice           | Chức năng                                | Persist |
| --------------- | ---------------------------------------- | ------- |
| `auth`          | User đang đăng nhập, trạng thái xác thực | ✓       |
| `chat`          | Tin nhắn theo từng cuộc hội thoại        | ✓       |
| `conversations` | Danh sách hội thoại, tìm kiếm            | ✓       |
| `accounts`      | Tất cả tài khoản người dùng              | ✓       |
| `settings`      | Theme, ngôn ngữ                          | ✓       |

### localStorage Persistence

Toàn bộ state quan trọng được lưu vào `localStorage` với prefix `chatapp_`, đảm bảo dữ liệu không mất khi reload trang.

### Internationalization (i18n)

Hệ thống đa ngôn ngữ tự xây dựng hỗ trợ **Tiếng Việt** và **English** với hơn 50 translation keys. Chuyển đổi ngôn ngữ tức thì trong Settings.

### Responsive Design

- **Breakpoint:** 1024px
- **Desktop (≥1024px):** Layout 3 cột — Sidebar | Danh sách hội thoại | Cửa sổ chat
- **Mobile (<1024px):** Layout 1 panel duy nhất với sidebar dạng drawer, nút hamburger menu, nút back để quay lại

### Theming

Hỗ trợ **Light** và **Dark** mode thông qua CSS Variables (`data-theme` attribute), chuyển đổi tức thì không cần reload.

### TypeScript

Type-safe hoàn toàn với các interface: `User`, `Message`, `Conversation`, `Language`, `Theme`.

---

## Tính năng chính

### 1. Quản lý tài khoản

- Chọn tài khoản để đăng nhập
- Tìm kiếm tài khoản
- Thêm tài khoản mới (qua modal)
- Xóa tài khoản (có xác nhận)
- Phân trang (hiển thị 5 tài khoản/trang, điều hướng bằng mũi tên)

### 2. Chat

- Gửi và nhận tin nhắn
- Hiển thị avatar, tên người gửi, thời gian
- Chọn emoji với bộ emoji đa danh mục
- Nút đính kèm file (UI)
- Phân biệt tin nhắn của mình và người khác
- Tự động cuộn xuống tin nhắn mới

### 3. Quản lý hội thoại

- Danh sách hội thoại sắp xếp theo tin nhắn mới nhất
- Tìm kiếm hội thoại và liên hệ
- Hiển thị tin nhắn cuối cùng và thời gian
- Badge đếm tin nhắn chưa đọc
- Tự động tạo hội thoại mới khi chat với liên hệ mới

### 4. Trạng thái Online/Offline

- Hiển thị trạng thái real-time (online/offline/away/busy) qua badge trên avatar
- Tự động chuyển **online** khi đăng nhập, **offline** khi đăng xuất
- Đồng bộ trạng thái trên toàn bộ giao diện

### 5. Cài đặt

- **Đổi tên** tài khoản (đồng bộ auth + accounts)
- **Giao diện:** Sáng / Tối
- **Ngôn ngữ:** Tiếng Việt / English

### 6. Sidebar

- Hiển thị avatar và tên người dùng
- Điều hướng giữa Chat và Settings
- Nút đăng xuất

### 7. Responsive

- Tự động chuyển layout theo kích thước màn hình
- Hỗ trợ Desktop, Tablet (iPad), Mobile
- Sidebar dạng drawer trên mobile với overlay

---

## Cấu trúc thư mục

```
src/
├── app/                    # Redux store & hooks
├── components/             # Components dùng chung (Layout, Avatar)
├── features/
│   ├── accounts/           # Quản lý danh sách tài khoản
│   ├── auth/               # Xác thực & AccountPicker
│   ├── chat/               # ChatWindow, MessageInput, MessageItem, EmojiPicker
│   ├── conversations/      # ConversationList, ConversationItem, SearchBar
│   ├── settings/           # SettingsPanel (theme, language, rename)
│   └── sidebar/            # Sidebar navigation
├── types/                  # TypeScript interfaces
└── utils/                  # Tiện ích (i18n, localStorage, formatDate)
```

---

## Hướng dẫn chạy

### Yêu cầu

- **Node.js** >= 18
- **npm** >= 9

### Cài đặt

```bash
git clone <repository-url>
cd Frontend
npm install
```

### Chạy Development Server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

### Build Production

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Kiểm tra code (Lint)

```bash
npm run lint
```

---

## Hướng dẫn sử dụng

1. **Chọn tài khoản** — Tại màn hình đăng nhập, chọn một tài khoản có sẵn hoặc thêm tài khoản mới bằng cách click "Thêm tài khoản"
2. **Bắt đầu chat** — Chọn một hội thoại trong danh sách bên trái, hoặc tìm kiếm liên hệ để tạo hội thoại mới
3. **Gửi tin nhắn** — Nhập nội dung vào ô chat, chọn emoji nếu muốn, nhấn Enter hoặc click nút gửi
4. **Đổi tên** — Vào Settings (biểu tượng cài đặt trên sidebar), nhập tên mới và nhấn "Lưu"
5. **Đổi giao diện** — Vào Settings, chọn Sáng hoặc Tối
6. **Đổi ngôn ngữ** — Vào Settings, chọn Tiếng Việt hoặc English
7. **Đăng xuất** — Click nút đăng xuất ở cuối sidebar
