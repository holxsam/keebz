import React, { useEffect, useState, memo } from "react";
import styled from "@emotion/styled";
import keyNames from "../utils/keycodes.json";
import { css } from "@emotion/react";
import DynamicPortal from "./DynamicPortal";
import { motion } from "framer-motion";
import isEqual from "lodash.isequal";

const KeySlot = styled.div`
  position: relative;

  min-width: ${({ w }) => w}px;
  width: ${({ w }) => w}px;
  max-width: ${({ w }) => w}px;

  min-height: ${({ h }) => h}px;
  height: ${({ h }) => h}px;
  max-height: ${({ h }) => h}px;

  background-color: transparent;
  padding: 0 ${({ keyGap }) => keyGap}px ${({ keyGap }) => keyGap}px 0;
`;

const BlankKey = styled.button`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const Key = styled(motion.button)`
  -webkit-app-region: no-drag;
  width: 100%;
  height: 100%;
  overflow: hidden;

  user-select: none;

  /* padding-top: 5px; */
  /* padding-left: 10px; */

  /* font-size: 1.2rem; */

  box-shadow: inset 0px 0px 0px 1px
    ${({ theme }) => theme.colors.onPrimary.main};
  border-radius: 10px;

  ${({ pressed, selected, theme }) =>
    css`
      background-color: ${pressed ? theme.colors.primary.main : "transparent"};
      color: ${pressed ? theme.colors.background.main : "white"};
      font-weight: ${pressed ? 800 : 600};
      box-shadow: inset 0px 0px 0px 1px
        ${pressed ? theme.colors.primary.main : theme.colors.onPrimary.main};
    `};

  ${({ selected, theme }) =>
    selected
      ? css`
          box-shadow: inset 0px 0px 0px 3px ${theme.colors.primary.main};
        `
      : null}

  &:hover, &:focus {
    box-shadow: inset 0px 0px 0px 1px
      ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 800;
    font-size: 1.25rem;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Keycap = ({
  unit = 70,
  keyGap = 5,
  keyData = { kc: -1, w: 1, h: 1, alias: "d" },
  pressed = false,
  selected = false,
  onClick,
  // setSelected = () => {},
}) => {
  const width = Math.max(keyData.w * unit, 3 + keyGap);
  const height = Math.max(keyData.h * unit, 3 + keyGap);

  return (
    <KeySlot w={width} h={height} keyGap={keyGap}>
      {keyData.kc === -1 ? (
        <BlankKey onClick={onClick} selected={selected} />
      ) : (
        <Key
          onClick={onClick}
          pressed={pressed}
          selected={selected}
          whileTap={{ scale: 0.85 }}
        >
          {keyNames[keyData.kc]}
        </Key>
      )}
    </KeySlot>
  );
};

const compare = (prevProps, nextProps) => {
  return (
    prevProps.unit === nextProps.unit &&
    prevProps.keyGap === nextProps.keyGap &&
    prevProps.isKeyPressed === nextProps.isKeyPressed &&
    prevProps.selected === nextProps.selected &&
    prevProps.pressed === nextProps.pressed &&
    isEqual(prevProps.keyData, nextProps.keyData)
  );
};

export default memo(Keycap, compare);
