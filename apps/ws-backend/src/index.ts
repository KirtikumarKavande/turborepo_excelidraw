import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from "express";
import cors from "cors";
type draw = {
  shape: string;
  x: number;
  y: number;
  height: number;
  roomId: string;
};
const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
  socket.on("join-room", (room:string) => {
    console.log(room);
    socket.join(room);
  });

   socket.on("draw", (drawOnCanvas:draw) => {
    console.log(drawOnCanvas);
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`WebSocket server running at http://localhost:${PORT}`);
});
