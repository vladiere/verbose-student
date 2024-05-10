export interface User {
  id: number;
  fullname: string;
  username: string;
  password: string;
  ctime: string;
  mtime: string;
}

export interface ResUser {
  id: number;
  fullname: string;
  username: string;
  ctime: string;
  mtime: string;
}

export interface UserForUpdate {
  id: number;
  password: string;
}

export interface UserForLogin {
  username: string;
  password: string;
}

export interface JWTDetails {
  username: string;
  id: number;
}

export interface UserForCreate {
  fullname: string;
  username: string,
  password: string,
}
