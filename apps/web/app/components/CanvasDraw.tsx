"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../components/css/canvasDraw.module.css";
import { io, socket } from "../utility/socket";

const CanvasDraw = () => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    socket.emit('join-room',"myRoom1")
    setWindowSize({
      width: window.innerWidth - 5,
      height: window.innerHeight - 10,
    });
    setIsClient(true);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth - 5,
        height: window.innerHeight - 10,
      });
    };
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const mainCanvas = mainCanvasRef.current;
    if (overlayCanvas && mainCanvas) {
      const overlay = overlayCanvas.getContext("2d");
      const main = mainCanvas.getContext("2d");
      if (!overlay) return;
      let isMouseDown = false;
      let x = 0;
      let y = 0;
      let width = 0;
      let height = 0;
      overlayCanvas.addEventListener("mousedown", (event) => {
        isMouseDown = true;
        x = event.clientX - overlayCanvas.offsetLeft;
        y = event.clientY - overlayCanvas.offsetTop;
      });

      overlayCanvas.addEventListener("mousemove", (event) => {
        if (isMouseDown) {
          width = event.clientX - overlayCanvas.offsetLeft - x;
          height = event.clientY - overlayCanvas.offsetTop - y;
          overlay.strokeStyle = "white";
          overlay.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

          overlay.strokeRect(x, y, width, height);
        }
      });

      overlayCanvas.addEventListener("mouseup", () => {
        isMouseDown = false;
        if (!main) return;
        main.strokeStyle = "white";
        main.strokeRect(x, y, width, height);

        socket.emit("draw", {
          shape: "rectangle",
          x,
          y,
          height,
          width,
        });

        /*
        {
        shape:rectangle,
        x,y,height,width,
        }
        */
        overlay.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      });
    }
  }, [isClient]);

  if (!isClient) {
    return <div>loading.....</div>;
  }

  return (
    <div>
      <div id="mainCanvas" className={styles.mainCanvas}>
        <canvas
          ref={mainCanvasRef}
          width={windowSize.width}
          height={windowSize.height}
        ></canvas>
      </div>
      <div id="overlayCanvas" className={styles.overlayCanvas}>
        <canvas
          ref={overlayCanvasRef}
          width={windowSize.width}
          height={windowSize.height}
        ></canvas>
      </div>
    </div>
  );
};

export default CanvasDraw;
