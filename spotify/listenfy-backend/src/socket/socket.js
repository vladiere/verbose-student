/**
 *@license Apache-2.0/MIT
 *@copyright vladiere
 */

'use-strict';

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

const messages = [] // { room: { users: [ { user, mesasges } ], room_name } }
const users = [] // { user_id, socketId, username }
const rooms = [] // { room: { users: [], room_name } }

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const addUserToRoom = ({ user, room }) => {
  // Find the target room
  const targetRoom = rooms.find(r => r.room_name === room);

  // If the room doesn't exist, create it
  if (!targetRoom) {
    rooms.push({ room_name: room, users: [user] });
    console.log(`Room '${room}' created with user '${user.username}'`);
    return;
  }

  // Check if the user with the provided socketId already exists in the room
  const existingUser = targetRoom.users.find(u => u.user_id === user.user_id);

  // If the user doesn't exist in the room, add them
  if (!existingUser) {
    targetRoom.users.push(user);
    console.log(`User '${user.username}' added to room '${room}'`);
    return 'has join';
  } else {
    console.log(`User '${user.username}' already exists in room '${room}'`);
    return 'is back';
  }
};

const userLeave = (id, room_name) => {
  const room = rooms.find(r => r.room_name === room_name);
  if (room) {
    const index = room.users.findIndex(user => user.id === id);

    if (index !== -1) {
      rooms.users.splice(index, 1);
    }
  }
  console.log(`User ${id} leave the ${room_name}`)
}

const getRoomUsers = (room_name) => {
  return rooms.find(r => r.room_name === room_name);
}

const getMessagesOfRoom = (room_name) => {
  const msgs = messages.find(r => r.room_name === room_name);

  if (!msgs) {
    return 0;
  }

  return msgs;
}

const addMessageToRoom = (data) => {
  const room_msg = getMessagesOfRoom(data.room);
  console.log('Room messges',room_msg);

  if (room_msg === 0) {
    const room = {
      room_name: data.room,
      data: [
        {
          user: data.data.user,
          message: data.data.message,
          timestamp: data.data.timestamp,
        },
      ],
    }
    messages.push(room);
  } else {
    console.log('Current data: ', room_msg);
    console.log('Data to be inserted: ',data);
    room_msg.data.push(data.data)
  }
  console.log('Messages: ',messages);
}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
  io.emit('get_socketId', socket.id);

  socket.on('user_connected', data => {
    console.log(data)
    io.emit('new_user', data);
  });

  socket.on('join room', (data, cb) => {
    socket.join(data.room);
    socket.room = data.room;

    const user_state = addUserToRoom({ user: data.user, room: data.room });

    io.to(data.room).emit('has joined', { user: data.user, user_state });
    io.to(data.room).emit('users', getRoomUsers(data.room));
    console.log(rooms)
    io.to(data.room).emit('get messages', getMessagesOfRoom(data.room))
  })

  socket.on('get messages', data => {
    console.log(socket.room)
    socket.join(data.room);
    socket.room = data.room;
    io.to(data.room).emit('get messages', getMessagesOfRoom(data.room));
  })

  socket.on('send message', (data) => {
    socket.join(data.room);
    socket.room = data.room;
    console.log('Data: ',data);
    addMessageToRoom(data);
    io.to(data.room).emit('get messages', getMessagesOfRoom(data.room));
  });

  socket.on('leave room', data => {
    socket.join(data.room);
    socket.room = data.room;
    userLeave(data.user_id, data.room);
    io.to(data.room).emit('user leave', { data, user_state: 'leave the room' });
  })

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
	});
});

export { app, io, server };
