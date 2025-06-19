"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../components/css/canvasDraw.module.css";
import { socket } from "../utility/socket";
import { draw as drawType } from "@repo/ts-types/draw";
import OverlayCanvas from "./OverlayCanvas";
import MainCanvas from "./MainCanvas";
import { shapes } from "@repo/constants/shapes";

const CanvasDraw = () => {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState<drawType>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [currentShape, setCurrentShape] = useState(shapes.Rectangle);

  function onDrawComplete(res: drawType) {
    setDimensions(res);
  }

  useEffect(() => {
    socket.emit("join-room", "myRoom1");
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>loading.....</div>;
  }

  return (
    <div>
      <OverlayCanvas
        currentShape={currentShape}
        onDrawComplete={onDrawComplete}
      />
      <MainCanvas dimensions={dimensions} currentShape={currentShape} />
      <div className={styles.btnList}>
        <button
          className={styles.drawBtn}
          onClick={() => setCurrentShape(shapes.Circle)}
        >
          Circle
        </button>
        <button
          onClick={() => setCurrentShape(shapes.Rectangle)}
          className={styles.drawBtn}
        >
          Rectangle
        </button>

        <button
          onClick={() => setCurrentShape(shapes.Pencil)}
          className={styles.drawBtn}
        >
          Pencil
        </button>
      </div>
    </div>
  );
};

export default CanvasDraw;
