import { io } from 'socket.io-client';

const websocket = io('http://localhost:8080');

export default websocket;
