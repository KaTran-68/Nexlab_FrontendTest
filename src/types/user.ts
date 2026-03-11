export type UserStatus = "online" | "offline" | "away" | "busy";

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
}
