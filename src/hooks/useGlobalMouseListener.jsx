import { useEffect, useState } from "react";

import keyNames from "../utils/keycodes.json";
import mouseCodes from "../utils/mouse-codes.json";
const { ipcRenderer } = window; // this is possible because of the preload.js + main.js
// otherwise we would need to use `const { ipcRenderer } = window.require("electron");`

const useGlobalMouseListener = () => {
  const [lastMouseClick, setLastMouseClick] = useState({
    button: 1,
    clicks: 5,
    kc: -19,
    x: -1,
    y: -1,
    type: "mouseup",
  });
  const [mouseInputs, setMouseInputs] = useState([]);

  const mouseToKeyCode = (nativeMouseObject) => ({
    ...nativeMouseObject,
    kc: mouseCodes[nativeMouseObject.button],
  });

  const addToKeys = (keycode) => {
    setLastMouseClick(mouseToKeyCode(keycode));
    setMouseInputs((allKeys) => {
      const index = allKeys.findIndex((v) => v.button === keycode.button);

      if (index === -1) return [...allKeys, mouseToKeyCode(keycode)];
      else return allKeys;
    });
  };

  const deleteFromKeys = (keycode) => {
    setMouseInputs((allKeys) => {
      const index = allKeys.findIndex((v) => v.button === keycode.button);
      return [
        ...allKeys.slice(0, index),
        ...allKeys.slice(index + 1, allKeys.length),
      ];
    });
  };

  const isMouseClickHeld = (keycode) => {
    const index = mouseInputs.findIndex((v) => v.kc === keycode);
    return index !== -1;
  };

  useEffect(() => {
    const add = (e, m) => {
      addToKeys(m);
    };

    const remove = (e, m) => {
      deleteFromKeys(m);
    };

    ipcRenderer.on("mousedown", add);
    ipcRenderer.on("mouseup", remove);

    return () => {
      ipcRenderer.removeListener("mousedown", add);
      ipcRenderer.removeListener("mouseup", remove);
    };
  }, []);

  return { lastMouseClick, mouseInputs, isMouseClickHeld };
};

export default useGlobalMouseListener;
