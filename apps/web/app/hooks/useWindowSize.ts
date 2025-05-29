import React, { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
  width: 0,
  height: 0,
});
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth - 5,
      height: window.innerHeight - 10,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth - 5,
        height: window.innerHeight - 10,
      });
    };
    window.addEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
