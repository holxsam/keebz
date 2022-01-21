import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import KeyboardLayout from "./components/KeyboardLayout";

import DEFAULT_QWERTY from "./keyboard-layouts/qwerty-100.json";
import ORTHO_QWERTY from "./keyboard-layouts/ortho-qwerty-60.json";
import useGlobalKeyboardListener from "./hooks/useGlobalKeyboardListener";
import Drawer from "./components/Drawer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import MenuBar from "./components/MenuBar";
import { useUIState } from "./contexts/UIContext";
import useResizeObserver from "use-resize-observer";

const AppContainer = styled.div`
  /* border: 2px dashed lightblue; */
  overflow: hidden;

  position: relative;
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.s}px) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  -webkit-app-region: drag;
  width: min-content;
  height: min-content;
`;

const App = () => {
  const { presentationMode, togglePresentationMode } = useUIState();
  const mainRef = useRef(null);
  const { width = 1000, height = 800 } = useResizeObserver({ ref: mainRef });
  // const { lastKeyPressed, kbInputs, isKeyPressed } =
  //   useGlobalKeyboardListener();

  useEffect(() => {
    const presentationModeWidth = presentationMode ? 0 : 0;
    const presentationModeHeight = presentationMode ? 0 : 250 + 32;

    const totalWidth = width + presentationModeWidth;
    const totalHeight = height + presentationModeHeight;
    console.log("hey resize the window", width, height);
    window.ipcRenderer.send("resize-main-window", totalWidth, totalHeight);
  }, [width, height, presentationMode]);

  return (
    <AppContainer id="app">
      {!presentationMode && <MenuBar />}
      {!presentationMode && <Drawer />}

      <Main ref={mainRef}>
        <KeyboardLayout layoutConfig={ORTHO_QWERTY} />
      </Main>
    </AppContainer>
  );
};

export default App;
