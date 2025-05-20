// composables/useSocket.ts
import { io } from "socket.io-client";

import { toast } from "vue-sonner";
const socket = io("http://localhost:3001");

export function useSocket() {
  const soldiers = useState("soldiers", () => new Map());

  socket.on("soldier:update", (data) => {
    soldiers.value.set(data.id, data);
  });

  socket.on("alert", (data) => {
    toast( `⚠️ ${data.name} is in danger!`,{
      description: data.message,
    });
  });

  return { socket, soldiers };
}
