import { io, Socket } from 'socket.io-client';

const socket: Socket = io.connect('http://localhost:3500');

export default socket;
