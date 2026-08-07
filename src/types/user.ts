export type UserRole = "Admin" | "Member";

export interface User {
  id?: string;

  name: string;

  email: string;

  role: UserRole;

  createdAt: number;
}