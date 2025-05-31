import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import styles from "../components/css/canvasDraw.module.css";
import { DrawingState } from "../../ts-types/types";
import CanvasRenderService from "../service/canvasRenderService";
import { draw } from "@repo/ts-types/draw";

const OverlayCanvas = ({
  currentShape,
  onDrawComplete,
}: {
  currentShape: string;
  onDrawComplete: (dimensions:draw) => void;
}) => {
  const overLayRef = useRef<HTMLCanvasElement>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>({
    isDrawing: false,
    x: 0,
    y: 0,
  });

  function calculateHeightWidth(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!overLayRef.current || !drawingState.isDrawing) return {width: 0, height: 0};

    const width =
      event.clientX - overLayRef.current.offsetLeft - drawingState.x;
    const height =
      event.clientY - overLayRef.current.offsetTop - drawingState.y;

      return {width, height};
  }
  function onMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!overLayRef.current) return;
    setDrawingState({
      isDrawing: true,
      x: event.clientX - overLayRef.current.offsetLeft,
      y: event.clientY - overLayRef.current.offsetTop,
    });
  }
  function onMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!overLayRef.current || !drawingState.isDrawing) return;
    // const width =
    //   event.clientX - overLayRef.current.offsetLeft - drawingState.x;
    // const height =
    //   event.clientY - overLayRef.current.offsetTop - drawingState.y;
    const {width,height} =calculateHeightWidth(event);
    const canvas = overLayRef.current.getContext("2d");
    CanvasRenderService.clearFullCanvas(
      canvas!,
      overLayRef.current.width,
      overLayRef.current.height
    );
    const dimensions: draw = {
      x: drawingState.x,
      y: drawingState.y,
      width: width,
      height: height,
    };
    CanvasRenderService.drawShape(currentShape, canvas!, dimensions);
  }
  function onMouseUp(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!overLayRef.current || !drawingState.isDrawing) return;

    const {height,width}=calculateHeightWidth(event);
    const canvas = overLayRef.current.getContext("2d");
    const dimensions: draw = {
        x: drawingState.x,
        y: drawingState.y,
        width: width,
        height: height,
    }
    onDrawComplete(dimensions);
    CanvasRenderService.clearFullCanvas(canvas!, overLayRef.current!.width, overLayRef.current!.height);
    setDrawingState({
      isDrawing: false,
      x: 0,
      y: 0,
    });
  }
  return (
    <Canvas
      className={styles.overlayCanvas}
      ref={overLayRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    ></Canvas>
  );
};

export default OverlayCanvas;
