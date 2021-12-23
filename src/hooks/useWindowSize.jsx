import { useEffect, useState } from "react";

const { ipcRenderer } = window; // this is possible because of the preload.js + main.js
// otherwise we would need to use `const { ipcRenderer } = window.require("electron");`

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onResize = (e) => {
      // console.log("resizing", window.innerHeight, window.innerWidth);
      const { innerHeight, innerWidth } = window;
      setWindowSize((prev) => ({
        ...prev,
        width: innerWidth,
        height: innerHeight,
      }));
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { windowSize, setWindowSize };
};

export default useWindowSize;
