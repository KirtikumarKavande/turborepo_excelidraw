import React, { useEffect, useRef } from "react";
import Canvas from "./Canvas";
import styles from "../components/css/canvasDraw.module.css";
import CanvasRenderService from "../service/canvasRenderService";
import { draw } from "@repo/ts-types/draw";
import { socket } from "../utility/socket";

const MainCanvas = ({
  currentShape,
  dimensions,
}: {
  currentShape: string;
  dimensions: draw;
}) => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mainCanvasRef.current) return;
    const canvas = mainCanvasRef.current.getContext("2d");
    CanvasRenderService.drawShape(currentShape, canvas!, dimensions);
  }, [dimensions]);

  useEffect(() => {
    socket.on("user-data", (data: draw) => {
      console.log("good console",data)
      if (!mainCanvasRef.current) return;
      const canvas = mainCanvasRef.current.getContext("2d");
      const { shape, ...dimensions } = data;
      CanvasRenderService.drawShape(shape!, canvas!, dimensions);
    });
  }, []);

  return <Canvas className={styles.mainCanvas} ref={mainCanvasRef}></Canvas>;
};

export default MainCanvas;
