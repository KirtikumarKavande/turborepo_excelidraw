"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../components/css/canvasDraw.module.css";
import { socket } from "../utility/socket";
import { draw, draw as drawType } from "@repo/ts-types/draw";
import useWindowSize from "../hooks/useWindowSize";
import OverlayCanvas from "./OverlayCanvas";
import MainCanvas from "./MainCanvas";
import { shapes } from "@repo/constants/shapes";

const CanvasDraw = () => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [draw, setDraw] = useState<any>([]);
  const windowSize = useWindowSize();
  const [selectedBtn, setSelectedBtn] = useState("");
  const [dimensions, setDimensions] = useState<draw>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  // new ------------------------------------------------------

  const [currentShape, setCurrentShape] = useState(shapes.Rectangle);

  function onDrawComplete(res: draw) {
    setDimensions(res);
  }

  useEffect(() => {
    const mainCanvas = mainCanvasRef.current;
    if (!mainCanvas) return;
    const main = mainCanvas.getContext("2d");

    if (!main) return;
    main.strokeStyle = "white";

    draw.forEach((item: drawType) => {
      if (item.shape === "rectangle") {
        main.strokeRect(item.x, item.y, item.width, item.height);
      }
    });
  }, [draw]);
  useEffect(() => {
    socket.emit("join-room", "myRoom1");
    socket.on("user-data", (data: object) => {
      setDraw((prev: drawType[]) => [...prev, data]);
    });
    setIsClient(true);
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
        console.log("hiiiii", selectedBtn);

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
          console.log("hiiiii", selectedBtn);

          if (selectedBtn === "circle") {
            overlay.beginPath();
            overlay.arc(x, y, Math.max(height, width), 0, 2 * Math.PI);
            // ctx.arc(95,50,40,0,2*Math.PI);
            overlay.stroke();
          }
        }
      });

      overlayCanvas.addEventListener("mouseup", () => {
        isMouseDown = false;
        if (!main) return;
        main.strokeStyle = "white";
        main.strokeRect(x, y, width, height);
        if (selectedBtn === "circle") {
          main.beginPath();
          main.arc(x, y, Math.max(height, width), 0, 2 * Math.PI);
          // ctx.arc(95,50,40,0,2*Math.PI);
          main.stroke();
        }
        socket.emit("draw", {
          shape: "rectangle",
          x,
          y,
          height,
          width,
          roomId: "myRoom1",
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
  }, [isClient, selectedBtn]);

  if (!isClient) {
    return <div>loading.....</div>;
  }

  return (
    <div>
      {/* <div id="mainCanvas" className={styles.mainCanvas}>
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
      </div> */}

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
      </div>
    </div>
  );
};

export default CanvasDraw;
