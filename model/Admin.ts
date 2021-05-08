export interface User {
  id: string;
  surname: string;
  firstName: string;
  country: string;
  city: string;
  adminId: string;
}

export interface Content {
  id: string;
  title: string;
  contentBody: string;
  adminId: string;
}

export interface Admin {
  id: string;
  surname: string;
  firstName: string;
  users: User[];
  contents: Content[];
}

export interface AuthAdmin {
  email: string;
  password: string;
  admin: Admin;
  adminId: string;
}

export interface Notification {
  id: string;
  notification: string;
}

export interface AdminResponse {
  code: number;
  data: AuthAdmin;
  message: string;
}

export interface LoginResponse {
  jwtstring: string;
  response: AdminResponse;
}
