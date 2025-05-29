"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// socket.js
const socket_io_1 = require("socket.io");
function initSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: { origin: "*" },
    });
    io.on("connection", (socket) => {
        console.log("Frontend connected");
        // Real-time data from ESP32
        socket.on("soldier:data", (data) => {
            // data = { id, location, heartRate, ammo, orientation }
            io.emit("soldier:update", data); // Broadcast to frontends
            if (data.heartRate < 70) {
                io.emit("alert", {
                    id: data.id,
                    message: "Heart rate dropped below 70!",
                });
            }
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}
exports.default = initSocket;
