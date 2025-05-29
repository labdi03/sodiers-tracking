require("dotenv").config();

import express  from "express";
import mongoose from "mongoose";
import http from "http";
import initSocket from "./socket";
import dotenv from "dotenv";


dotenv.config();
const app = express();

app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// REST routes
app.use("/api/soldiers", require("./routes/soldiers"));

// Server & Socket
const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
