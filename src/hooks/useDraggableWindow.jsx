import { useRef } from "react";

const useDraggableWindow = () => {
  const windowToCursorDelta = useRef({ x: 0, y: 0 });
  const mouseIsDragging = useRef(false);

  const onMouseMove = (e) => {
    if (mouseIsDragging.current) {
      const currentMousePosition = { x: e.screenX, y: e.screenY };
      window.ipcRenderer.send(
        "manual-move-window",
        windowToCursorDelta.current,
        currentMousePosition
      );
    }
  };

  const onMouseDown = (e) => {
    mouseIsDragging.current = true;
    windowToCursorDelta.current = {
      x: e.screenX - window.screenX,
      y: e.screenY - window.screenY,
    };
  };

  const onMouseUp = () => {
    mouseIsDragging.current = false;
  };

  const onMouseLeave = () => {
    mouseIsDragging.current = false;
  };

  return { onMouseMove, onMouseDown, onMouseUp, onMouseLeave };
};

export default useDraggableWindow;
