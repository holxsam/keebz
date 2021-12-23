import { useEffect, useState } from "react";
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

const AppContainer = styled.div`
  /* border: 2px dashed lightblue; */

  position: relative;
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.s}px) {
    flex-direction: column;
  }
`;

const LastInput = styled.p`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: 0.25rem;
`;

const App = () => {
  // const { lastKeyPressed, kbInputs, isKeyPressed } =
  //   useGlobalKeyboardListener();

  return (
    <AppContainer id="app">
      <Drawer />
      {/* <KeyboardLayout layoutConfig={ORTHO_QWERTY} /> */}
      {/* <LastInput>
        last input: <pre>{JSON.stringify(lastKeyPressed, null, 2)}</pre>
      </LastInput> */}

      {/* <KeyboardLayout layoutConfig={DEFAULT_QWERTY} /> */}
      <KeyboardLayout layoutConfig={ORTHO_QWERTY} />
      {/* <DndContext>
        <KeyboardLayout layoutConfig={ORTHO_QWERTY} />
      </DndContext> */}
    </AppContainer>
  );
};

export default App;
