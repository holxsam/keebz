import React, { createRef, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import keyNames from "../utils/keycodes.json";
import { css } from "@emotion/react";
import useGlobalKeyboardListener from "../hooks/useGlobalKeyboardListener";
import DEFAULT_LAYOUT from "../keyboard-layouts/qwerty-100.json";
import useWindowSize from "../hooks/useWindowSize";
import Keycap from "./Keycap";
import DynamicPortal from "./DynamicPortal";
import { AnimatePresence, motion } from "framer-motion";
import StandaloneWindow from "./StandaloneWindow";
import DrawerItem from "./DrawerItem";
import { useUIState } from "../contexts/UIContext";
import KeycapProperties from "./KeycapProperties";
import { DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import useGlobalMouseListener from "../hooks/useGlobalMouseListener";
import CounterInput from "./inputs/CounterInput";
import KeycapSettings from "./KeycapSettings";

const ipcRenderer = window.ipcRenderer;

const UNIT = 70; // px
const KEY_GAP = 5; // px

const T = { kc: 59, h: 1, w: 1, alias: "65", color: "salmon", grey: 2 };

const Container = styled.div`
  position: relative;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.onPrimary.main};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background.main};

  margin: 1rem;
  width: min-content;

  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PresentationButton = styled.button`
  -webkit-app-region: no-drag;

  position: absolute;
  bottom: 0;
  right: 0;

  width: 3rem;
  height: 3rem;
  margin: 1rem;

  background-color: #222;
`;

const rowify = (arr) => {
  const finalArray = [];

  const rowNumbers = new Set();
  arr.forEach((item) => {
    rowNumbers.add(item.y);
  });

  const rows = [...rowNumbers].sort();

  rows.forEach((row) => {
    finalArray.push(
      arr.filter((item) => item.y === row).sort((a, b) => a.x - b.x)
    );
  });

  return finalArray;
};

const KeyboardLayout = ({ layoutConfig = DEFAULT_LAYOUT, editLayout }) => {
  const {
    drawerState,
    setDrawerState,
    presentationMode,
    setPresentationMode,
    togglePresentationMode,
  } = useUIState();
  const { lastKeyPressed, kbInputs, isKeyPressed } =
    useGlobalKeyboardListener();

  const { mouseInputs, isMouseClickHeld } = useGlobalMouseListener();

  const { layout } = layoutConfig;
  const layout2d = rowify(layout);
  const [keySelectedId, setKeySelectedId] = useState(null);
  const keySelected = layout.find((key) => key.id === keySelectedId) ?? null;

  const animProps = {
    variants: {
      open: { x: 0, y: 0 },
      closed: {
        x: -400,
      },
    },
    initial: "closed",
    animate: keySelectedId !== null ? "open" : "closed",
    exit: "closed",
    transition: { duration: 0.25 },
    // transition: { velocity: 500 },
  };

  const isInputOn = (keycode) =>
    isKeyPressed(keycode) || isMouseClickHeld(keycode);
  const deselectKeys = () => setKeySelectedId(null);

  useEffect(() => {
    if (presentationMode) setKeySelectedId(null);
  }, [presentationMode]);

  useEffect(() => {
    // when the layout id changes, it means that a new layout was switched to
    // therefore we should close the key editor
    setKeySelectedId(null);
  }, [layoutConfig.id]);

  return (
    <DndContext
      // modifiers={[restrictToParentElement]}
      modifiers={[restrictToWindowEdges]}
    >
      <Container
      // ref={setNodeRef}
      // style={style}
      >
        {presentationMode && (
          <PresentationButton type="button" onClick={togglePresentationMode}>
            P
          </PresentationButton>
        )}
        {layout2d.map((row, i) => (
          <Row key={i}>
            {row.map((keyData, j) => (
              <Keycap
                key={j}
                keyData={keyData}
                // pressed={isKeyPressed(keyData.kc)}
                pressed={isInputOn(keyData.kc)}
                selected={keySelectedId === keyData.id}
                onClick={() => {
                  setPresentationMode(false);
                  if (keySelectedId === keyData.id) deselectKeys();
                  else setKeySelectedId(keyData.id);
                }}
              />
            ))}
          </Row>
        ))}

        {keySelectedId !== null && (
          <DrawerItem>
            <KeycapSettings close={deselectKeys}>
              <Keycap keyData={keySelected} pressed={false} selected={false} />
              <p>name: {keyNames[keySelected.kc]}</p>
              <p>keycode: {keySelected.kc}</p>
              <InputContainer>
                {JSON.stringify(keySelected)}

                <CounterInput
                  id="width-input"
                  label="W"
                  step={0.05}
                  value={keySelected.w}
                  onChange={(val) => {
                    editLayout(keySelected.id, {
                      w: val,
                    });
                  }}
                />

                <CounterInput
                  id="height-input"
                  label="H"
                  step={0.05}
                  value={keySelected.h}
                  onChange={(val) => {
                    editLayout(keySelected.id, {
                      h: val,
                    });
                  }}
                />
              </InputContainer>
            </KeycapSettings>
          </DrawerItem>
        )}
      </Container>
    </DndContext>
  );
};

export default KeyboardLayout;
