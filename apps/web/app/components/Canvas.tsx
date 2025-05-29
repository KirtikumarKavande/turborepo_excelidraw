import React, { forwardRef } from "react";
import useWindowSize from "../hooks/useWindowSize";

type CanvasProps = {
  className?: string;
  onMouseDown?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
};

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ className, onMouseDown, onMouseMove, onMouseUp }, ref) => {
    const windowSize = useWindowSize();

    return (
      <canvas
        ref={ref}
        width={windowSize.width}
        height={windowSize.height}
        className={className}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{ cursor: "crosshair" }}
      ></canvas>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
