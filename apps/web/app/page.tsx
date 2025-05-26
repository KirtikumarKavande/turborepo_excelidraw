import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import CanvasDraw from "./components/CanvasDraw";



export default function Home() {
  return (
   <div>
    <CanvasDraw/>
   </div>
  );
}
