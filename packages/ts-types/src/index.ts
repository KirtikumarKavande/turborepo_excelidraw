import {shapes} from "@repo/constants/shapes"

console.log(shapes.Rectangle)
export type draw = {
  shape: string;
  x: number;
  y: number;
  height: number;
  width: number;
  roomId: string;
};

export type drawConfig = {
  strokeColor: string;
  lineWidth:number
};


