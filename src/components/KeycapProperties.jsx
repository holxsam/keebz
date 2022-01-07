import styled from "@emotion/styled";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useDraggable } from "@dnd-kit/core";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const WidthInput = styled.input`
  color: black;
`;

const KeyPropContainer = styled(motion.div)`
  overflow: hidden;
  position: absolute;
  background-color: rgba(25, 25, 25, 0.7);
  width: 20rem;
  height: 30rem;
  /* outline: 1px solid rgba(255, 255, 255, 0.2); */

  border-radius: 10px;
  /* border: 2px solid ${({ theme }) => theme.colors.onPrimary.main}; */
  /* padding: 1rem; */

  backdrop-filter: blur(1.5px);
  backdrop-filter: blur(5px);
  /* box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75); */
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.2);

  transform: ${({ dragStyles }) => dragStyles};

  display: flex;
  flex-direction: column;
`;

const KeyPropHeader = styled(motion.div)`
  padding: 0.75rem;
  /* height: 4rem; */
  cursor: grab;

  /* border: 1px solid red; */
  border-bottom: 1px solid #58595d;
  /* background-color: #181818; */

  display: flex;
  /* justify-content: flex-end; */
  align-items: center;

  &:active {
    cursor: grabbing;
  }
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
  flex: 1;
  font-weight: 800;
  letter-spacing: 1px;
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

const KeycapProperties = ({ close, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: "unique-id",
    });

  const lastKnownPosition = useRef(INITIAL_POSITION);
  const [droppedPosition, setDropPosition] = useState(INITIAL_POSITION);

  const draggingPosition = transform
    ? {
        ...transform,
        x: transform.x + droppedPosition.x,
        y: transform.y + droppedPosition.y,
      }
    : INITIAL_POSITION;

  const currentPosition = isDragging ? draggingPosition : droppedPosition;
  const currentPositionCss = CSS.Translate.toString(currentPosition);

  const animProps = {
    variants: {
      initial: {
        x: -200,
        y: 0,
      },
      open: {
        x: currentPosition.x,
        y: currentPosition.y,
        opacity: 1,
        scale: 1,
      },
      closed: {
        scale: 1,
        x: currentPosition.x + 200,
        opacity: 0,
      },
      dragging: {
        x: currentPosition.x,
        y: currentPosition.y,
        opacity: 1,
        scale: 0.95,
      },
    },
    initial: "initial",
    animate: "open",
    // animate: selected !== null ? "open" : "closed",
    // animate: isDragging ? "dragging" : selected !== null ? "open" : "closed",
    exit: "closed",
    transition: { duration: isDragging ? 0 : 0.25 },
    // transition: { velocity: 500 },
  };

  useEffect(() => {
    if (transform) lastKnownPosition.current = transform;
  }, [transform]);

  useEffect(() => {
    if (!isDragging && !transform) {
      setDropPosition((prev) => ({
        ...prev,
        x: prev.x + lastKnownPosition.current.x,
        y: prev.y + lastKnownPosition.current.y,
      }));
    }
  }, [isDragging, transform]);

  return (
    <KeyPropContainer
      ref={setNodeRef}
      {...animProps}
      // whileTap={{ scale: 0.98 }}
      dragStyles={currentPositionCss}
    >
      <KeyPropHeader>
        <H {...listeners} {...attributes}>
          Key Properties
        </H>
        <CircleButton whileTap={{ scale: 0.85 }} onClick={close}>
          <MdClose />
        </CircleButton>
      </KeyPropHeader>
      <KeyPropContent>{children}</KeyPropContent>
      {/* <p>{JSON.stringify({ delta: transform })}</p>
      <p>---</p>
      <p>{JSON.stringify({ current: currentPosition })}</p>
      <p>---</p>
      <p>{JSON.stringify({ final: droppedPosition })}</p>
      <p>---</p>
      <p>{JSON.stringify(isDragging)}</p>
      <p>{currentPositionCss}</p> */}
    </KeyPropContainer>
  );
};

export default KeycapProperties;
