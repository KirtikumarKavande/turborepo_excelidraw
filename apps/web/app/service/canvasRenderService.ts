import { shapes } from "@repo/constants/shapes";
import { draw, drawConfig } from "@repo/ts-types/draw";
class CanvasRenderService {
  static additionalConfig(
    canvas: CanvasRenderingContext2D,
    config?: drawConfig
  ) {
    canvas.strokeStyle = (config && config.strokeColor) || "white";
    canvas.lineWidth = (config && config.lineWidth) || 1;
  }

  public static drawShape(
    shape: string,
    canvas: CanvasRenderingContext2D,
    dimensions: draw,
    config?: drawConfig
  ) {
    CanvasRenderService.additionalConfig(canvas, config);

    const shapesAvailable = {
      [shapes.Rectangle]: () =>
        CanvasRenderService.drawRectangle(canvas, dimensions),
      [shapes.Circle]: () => CanvasRenderService.drawCircle(canvas, dimensions),
    };
    if (shapesAvailable[shape]) {
      shapesAvailable[shape]();
    }
  }

  static clearFullCanvas(
    canvas: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    canvas.clearRect(0, 0, width, height);
  }

  private static drawRectangle(
    canvas: CanvasRenderingContext2D,
    dimensions: draw
  ) {
    const { x, y, width, height } = dimensions;
    canvas.strokeRect(x, y, width, height);
  }

  private static drawCircle(
    canvas: CanvasRenderingContext2D,
    dimensions: draw
  ) {
    const { x, y, width, height } = dimensions;
    canvas.beginPath();
    const radius = Math.max(Math.abs(width), Math.abs(height));
    canvas.arc(x, y, radius, 0, 2 * Math.PI);
    canvas.stroke();
  }
}

export default CanvasRenderService;
