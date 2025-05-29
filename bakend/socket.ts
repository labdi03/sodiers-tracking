// socket.js
import { Server } from 'socket.io';

import Soldier  from './models/Soldier';
function initSocket(server: any) {

  const io = new Server(server, {
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

export default initSocket;
