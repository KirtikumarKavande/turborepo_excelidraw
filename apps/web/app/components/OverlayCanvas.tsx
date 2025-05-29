import React, { useRef } from "react";
import Canvas from "./Canvas";
import styles from "../components/css/canvasDraw.module.css";

const OverlayCanvas = () => {
  const overLayRef = useRef(null);
  return (
    <Canvas className={styles.overlayCanvas} ref={overLayRef}></Canvas>
  );
};

export default OverlayCanvas;
