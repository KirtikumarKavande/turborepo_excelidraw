import React, { useRef } from "react";
import Canvas from "./Canvas";
import styles from "../components/css/canvasDraw.module.css";

const MainCanvas = () => {
  const mainCanvasRef = useRef(null);
  return (
    <Canvas className={styles.mainCanvas} ref={mainCanvasRef}></Canvas>
  );
};

export default MainCanvas;
