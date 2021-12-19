import { useEffect, useState } from "react";

import keyNames from "../utils/keycodes.json";
const { ipcRenderer } = window; // this is possible because of the preload.js + main.js
// otherwise we would need to use `const { ipcRenderer } = window.require("electron");`

const useGlobalKeyboardListener = () => {
  const [lastKeyPressed, setLastKeyPressed] = useState({
    kc: -1,
    alias: "blank",
  });
  const [kbInputs, setKbInputs] = useState([]);

  const addToKeys = (keycode) => {
    setLastKeyPressed({ kc: keycode, alias: keyNames[keycode] });
    setKbInputs((allKeys) => {
      const index = allKeys.findIndex((v) => v === keycode);

      if (index === -1) return [...allKeys, keycode];
      else return allKeys;
    });
  };

  const deleteFromKeys = (keycode) => {
    setKbInputs((allKeys) => {
      const index = allKeys.findIndex((v) => v === keycode);
      return [
        ...allKeys.slice(0, index),
        ...allKeys.slice(index + 1, allKeys.length),
      ];
    });
  };

  const isKeyPressed = (keycode) => {
    const index = kbInputs.findIndex((v) => v === keycode);
    return index !== -1;
  };

  useEffect(() => {
    const add = (e, m) => {
      addToKeys(m);
    };

    const remove = (e, m) => {
      deleteFromKeys(m);
    };

    ipcRenderer.on("keydown", add);
    ipcRenderer.on("keyup", remove);

    return () => {
      ipcRenderer.removeListener("keydown", add);
      ipcRenderer.removeListener("keyup", remove);
    };
  }, []);

  return { lastKeyPressed, kbInputs, isKeyPressed };
};

export default useGlobalKeyboardListener;
