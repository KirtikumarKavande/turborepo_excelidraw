import {shapes} from "@repo/constants/shapes"

export type draw = {
  shape?: string;
  x: number;
  y: number;
  height: number;
  width: number;
  roomId?: string;
};

export type drawConfig = {
  strokeColor: string;
  lineWidth:number
};


