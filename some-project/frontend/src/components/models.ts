export interface User {
  id: number;
  fullname: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserForCreate {
  fullname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserForLogin {
  email: string;
  password: string;
}

export interface Things {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ThingsForCreate {
  name: string;
  description: string;
  id: number;
}
