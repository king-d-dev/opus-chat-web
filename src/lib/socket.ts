import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config.json';

const socket = io(SOCKET_URL, {
  autoConnect: false,
  extraHeaders: {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
});

export { socket };
