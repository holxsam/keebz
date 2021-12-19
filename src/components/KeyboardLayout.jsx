import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import keyNames from "../utils/keycodes.json";
import { css } from "@emotion/react";
import useGlobalKeyboardListener from "../hooks/useGlobalKeyboardListener";
import DEFAULT_LAYOUT from "../keyboard-layouts/qwerty-100.json";

const UNIT = 70; // px
const KEY_GAP = 5; // px

const T = { kc: 59, h: 1, w: 1, alias: "65", color: "salmon", grey: 2 };

const Container = styled.div`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.onPrimary.main};
  border-radius: 10px;

  margin: 1rem;
  width: min-content;

  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const KeySlot = styled.div`
  min-width: ${({ w }) => w * UNIT}px;
  max-width: ${({ w }) => w * UNIT}px;
  min-height: ${({ h }) => h * UNIT}px;
  max-height: ${({ h }) => h * UNIT}px;

  background-color: transparent;
  padding: 0 ${KEY_GAP}px ${KEY_GAP}px 0;
`;

const BlankKey = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const Key = styled.button`
  width: 100%;
  height: 100%;

  /* padding-top: 5px; */
  /* padding-left: 10px; */

  /* font-size: 1.2rem; */

  box-shadow: inset 0px 0px 0px 1px
    ${({ theme }) => theme.colors.onPrimary.main};
  border-radius: 10px;

  ${({ pressed, theme }) =>
    css`
      background-color: ${pressed ? theme.colors.primary.main : "transparent"};
      color: ${pressed ? theme.colors.background.main : "white"};
      font-weight: ${pressed ? 800 : 600};
      box-shadow: inset 0px 0px 0px 1px
        ${pressed ? theme.colors.primary.main : theme.colors.onPrimary.main};
    `};

  &:hover {
    box-shadow: inset 0px 0px 0px 3px
      ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 800;
    font-size: 1.25rem;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

const KeyboardLayout = ({ layoutConfig = DEFAULT_LAYOUT }) => {
  const { lastKeyPressed, kbInputs, isKeyPressed } =
    useGlobalKeyboardListener();

  const [config, setConfig] = useState(layoutConfig.layout);
  // const [keyStates, setKeyStates] = useState();

  return (
    <Container>
      {config.map((row, i) => (
        <Row key={i}>
          {row.map((key, j) => (
            <KeySlot key={j} w={key.w} h={key.h}>
              {key.kc === -1 ? (
                <BlankKey />
              ) : (
                <Key pressed={isKeyPressed(key.kc)}>{keyNames[key.kc]}</Key>
              )}
            </KeySlot>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default KeyboardLayout;
