import { createServer } from "http";
import { Server, Socket } from "socket.io";
import express from "express";
import cors from "cors";
import { draw } from "@repo/ts-types/draw";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use('/ping',(req,res)=>{
  res.send('pong')
})

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
  socket.on("join-room", (room: string) => {
    console.log(room);
    socket.join(room);
  });

  socket.on("draw", (drawOnCanvas: draw) => {
    if(!drawOnCanvas.roomId) return
    io.to(drawOnCanvas.roomId).emit("user-data", drawOnCanvas);
    console.log(drawOnCanvas);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`WebSocket server running at http://localhost:${PORT}`);
});
