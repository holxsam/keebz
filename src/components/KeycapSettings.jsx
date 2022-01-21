import styled from "@emotion/styled";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useDraggable } from "@dnd-kit/core";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";

const KeyPropContainer = styled(motion.div)`
  overflow: hidden;

  background-color: rgba(25, 25, 25, 1);

  width: 20rem;
  height: 30rem;

  border-radius: 10px;

  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.2);

  display: flex;
  flex-direction: column;
`;

const KeyPropHeader = styled(motion.div)`
  padding: 0.75rem;

  border-bottom: 1px solid #58595d;

  display: flex;
  align-items: center;
`;

const KeyPropContent = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
`;

const Svg = styled(motion.svg)`
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;
`;

const H = styled.h1`
  user-select: none;
  flex: 1;
  font-weight: 800;
  letter-spacing: 1px;

  /* outline: 1px solid red; */
`;

const CircleButton = styled(motion.button)`
  border-radius: 50%;

  width: 1.74rem;
  height: 1.74rem;

  background-color: ${({ theme }) => theme.colors.danger.main};

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger.light};
  }

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* background-color: #fff; */
    width: 1rem;
    height: 1rem;
  }
`;

const INITIAL_POSITION = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
};

const KeycapSettings = ({ close, children }) => {
  const animProps = {
    variants: {
      initial: {
        x: -200,
        y: 0,
      },
      open: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      },
      closed: {
        scale: 1,
        x: 0 + 200,
        opacity: 0,
      },
      dragging: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 0.95,
      },
    },
    initial: "initial",
    animate: "open",
    // animate: selected !== null ? "open" : "closed",
    // animate: isDragging ? "dragging" : selected !== null ? "open" : "closed",
    exit: "closed",
    transition: { duration: 0 },
    // transition: { velocity: 500 },
  };

  return (
    <KeyPropContainer>
      <KeyPropHeader>
        <H>Key Properties</H>
        {/* <CircleButton whileTap={{ scale: 0.85 }}>
          <MdClose />
        </CircleButton> */}
      </KeyPropHeader>
      <KeyPropContent>{children}</KeyPropContent>
    </KeyPropContainer>
  );
};

export default KeycapSettings;
