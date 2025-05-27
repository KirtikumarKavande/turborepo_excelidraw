'use client'
import Image, { type ImageProps } from "next/image";

import CanvasDraw from "./components/CanvasDraw";

import io from "socket.io-client";
import { useEffect } from "react";
const socket = io("http://localhost:4000");
export default function Home() {
  useEffect(()=>{
    socket.emit('join-room',"connection done")
  })
  return (
    <div>
      <CanvasDraw />
    </div>
  );
}
