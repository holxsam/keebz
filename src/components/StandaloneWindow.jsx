import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * !!!!!!!!!!!!!
 * This component still has issues with emotion's theming:
 * Not all of the styles get copied over.
 * Need to somehow listen to emotion's changes.
 * As emotion components render they insert <style> into <head>,
 * however this only happens in the main window.
 *
 * This solution looks promising: https://stackoverflow.com/questions/62476353/can-emotion-core-emotion-styled-emotion-theming-be-used-with-electron
 * however, this project may not need
 */

function StandaloneWindow({ children, onClose }) {
  const [windowHandle, setWindowHandle] = useState(null);

  // SIDE EFFECT: WHEN COMPONENT MOUNTS OPEN A WINDOW
  //              WHEN THE COMPONENT UNMOUNTS, CLOSE THE WINDOW
  useEffect(() => {
    let w = window.open("");
    copyStyles(window.document, w.document);
    setWindowHandle(w);

    w.onunload = () => {
      onClose();
    };

    return () => {
      onClose();
      w.close();
      if (windowHandle) {
        windowHandle.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   copyStyles(window.document, windowHandle.document);
  // }, [windowHandle]);

  function copyStyles(source, target) {
    Array.from(
      source.querySelectorAll('link[rel="stylesheet"], style')
    ).forEach((link) => {
      target.head.appendChild(link.cloneNode(true));
    });
  }
  if (windowHandle) return createPortal(children, windowHandle.document.body);
  else return <></>;
}

export default StandaloneWindow;
