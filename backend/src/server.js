import express from "express";
import "dotenv/config";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

const PORT = process.env.PORT || 3021;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
