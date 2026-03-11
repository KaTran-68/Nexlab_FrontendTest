import type { Message } from "./message";
import type { User } from "./user";

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message | null;
  unreadCount: Record<string, number>;
  updatedAt: string;
}
