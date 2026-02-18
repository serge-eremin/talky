import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

// const app = express(); // we deleting app because we imported app from socket

const __dirname = path.resolve();

const PORT = ENV.PORT || 3021;

app.use(express.json({ limit: "15mb" })); //req.body
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    // res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // or
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// app.listen(PORT, () => { // because imported from socket
server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
  connectDB();
});
