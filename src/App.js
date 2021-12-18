import { useEffect, useState } from "react";
import keyNames from "./utils/keycodes.json";

const { ipcRenderer } = window; // this is possible because of the preload.js + main.js
// other we would need to use `const { ipcRenderer } = window.require("electron");`

function App() {
  const [kbs, setKeys] = useState([]);

  const addToKeys = (keycode) => {
    setKeys((allKeys) => {
      const index = allKeys.findIndex((v) => v === keycode);

      if (index === -1) return [...allKeys, keycode];
      else return allKeys;
    });
  };

  const deleteFromKeys = (keycode) => {
    setKeys((allKeys) => {
      const index = allKeys.findIndex((v) => v === keycode);
      return [
        ...allKeys.slice(0, index),
        ...allKeys.slice(index + 1, allKeys.length),
      ];
    });
  };

  useEffect(() => {
    ipcRenderer.on("keydown", (e, m) => {
      addToKeys(m);
    });

    ipcRenderer.on("keyup", (e, m) => {
      deleteFromKeys(m);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {kbs.map((item, i) => (
            <p key={i}>{keyNames[item]}</p>
          ))}
        </div>
        <p onClick={() => console.log(keyNames)}>start typing to see keys</p>
      </header>
    </div>
  );
}

export default App;
