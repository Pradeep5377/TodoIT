import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected: " + socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });
  });

  return io;
};
