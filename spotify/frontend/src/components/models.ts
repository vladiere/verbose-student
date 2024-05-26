export interface UserConnect {
  username: string;
  socketId: string;
  user_id: number;
}

export interface JoinRoom {
  user: UserConnect,
  room: string;
}

export interface UsersJoin {
  user: UserConnect;
  user_state: string;
}

export interface SendMessage {
  room: string;
  data: {
    user: UserConnect;
    timestamp: string;
    message: string;
  }
}

export interface Messages {
  user: UserConnect,
  timestamp: string;
  message: string;
}

export interface RoomNotify {
  user_id: number;
  username: string;
  message: string;
}

export interface Tracks {
  album_uri: string;
  artists: [];
  image: string;
  name: string;
  uri: string;
}
