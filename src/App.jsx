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
import useDraggableWindow from "./hooks/useDraggableWindow";
import { AnimatePresence } from "framer-motion";
import Keyboard from "./components/Keyboard";

const AppContainer = styled.div`
  /* border: 1px dashed lightblue; */
  border: 1px solid ${({ theme }) => theme.colors.surface.main};
  background-color: ${({ theme }) => theme.colors.background.main};
  /* background-color: transparent; */

  /* border-radius: 10px; */

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

const Header = styled.header`
  /* border: 1px solid green; */

  width: min-content;
  width: 100%;
  height: min-content;
`;

const Main = styled.main`
  /* border: 1px dashed red; */

  width: min-content;
  height: min-content;

  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  /* border: 1px dashed green; */

  display: flex;
  flex-direction: column;
`;

const MockComp = styled.div`
  width: 100%;
  height: 2rem;
  background-color: salmon;
`;

const App = () => {
  const { presentationMode, togglePresentationMode } = useUIState();
  const mainRef = useRef(null);
  const headerRef = useRef(null);
  const { width: mainWidth = 0, height: mainHeight = 0 } = useResizeObserver({
    ref: mainRef,
  });
  const { width: headerWidth = 0, height: headerHeight = 0 } =
    useResizeObserver({ ref: headerRef });
  const { eventBindings, setDisableDrag } = useDraggableWindow();

  useEffect(() => {
    const totalWidth = mainWidth + 2;
    const totalHeight = headerHeight + mainHeight + 2;
    window.ipcRenderer.send("resize-main-window", totalWidth, totalHeight);
  }, [mainWidth, mainHeight, headerWidth, headerHeight, presentationMode]);

  useEffect(() => {
    if (presentationMode) setDisableDrag(false);
    else setDisableDrag(true);
  }, [presentationMode]);

  return (
    <AppContainer id="app">
      <Header ref={headerRef}>
        <AnimatePresence>{!presentationMode && <MenuBar />} </AnimatePresence>
      </Header>

      <Main id="main" ref={mainRef} {...eventBindings}>
        <AnimatePresence>{!presentationMode && <Drawer />}</AnimatePresence>
        {/* <Content>
          {!presentationMode && <MockComp />}
          <KeyboardLayout layoutConfig={ORTHO_QWERTY} />
        </Content> */}
        <Keyboard />
      </Main>
    </AppContainer>
  );
};

export default App;
