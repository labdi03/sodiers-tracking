"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./socket"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// MongoDB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose_1.default.connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
// REST routes
app.use("/api/soldiers", require("./routes/soldiers"));
// Server & Socket
const server = http_1.default.createServer(app);
(0, socket_1.default)(server);
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
