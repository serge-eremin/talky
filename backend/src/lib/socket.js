import { Server } from "socket.io";
import http from "http";
import express from "express";

import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

//socketServer
const io = new Server(server, {
  cors: { origin: ENV.CLIENT_URL, credentials: true },
});

// apply authentification middleware to all socket connections
io.use(socketAuthMiddleware);

// ===== start this section: - handling online and ofline users=====
// this is for storing online users
/*
const userSocketMap = {}; // {userId: socketId}
userSocketMap[userId] = socket.id overwrites prior connections; 
disconnecting one tab removes the user even if another socket is still connected. 
Track a set/count of sockets per user.
*/

const userSocketMap = new Map(); // userId -> Set<socketId>

io.on("connection", (socket) => {
  console.log(`A user connected: `, socket.user.fullName);

  const userId = socket.userId;
  // userSocketMap[userId] = socket.id;
  const sockets = userSocketMap.get(userId) ?? new Set();
  sockets.add(socket.id);
  userSocketMap.set(userId, sockets);

  /// / io.emit() is used to send events to all connected clients
  // io.emit("getOnlineUsers", Object.keys(userSocketMap));
  io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  // // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log(`A user disconnected: `, socket.user.fullName);
    // delete userSocketMap[userId];

    // io.emit("getOnlineUsers", Object.keys(userSocketMap));

    const sockets = userSocketMap.get(userId);
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) userSocketMap.delete(userId);
    }
    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
  // ========= end =======
});

export { io, app, server };
