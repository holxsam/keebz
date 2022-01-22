import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MdClose, MdMinimize } from "react-icons/md";
import { useUIState } from "../contexts/UIContext";

import { useEffect, useRef, useState } from "react";
import useDraggableWindow from "../hooks/useDraggableWindow";

const Container = styled.div`
  user-select: none;

  width: 100vw;
  height: 32px;
  padding: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 0.35rem;
`;

const buttonStyles = css`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  /* border-radius: 50%; */

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: #222;
  }

  &:hover {
    filter: saturate(2);
    /* filter: brightness(130%); */
  }
`;

const CloseButton = styled.button`
  background-color: #ef4958;
  ${buttonStyles}
`;

const MinimizeButton = styled.button`
  background-color: #ffe27c;
  ${buttonStyles}
`;

const PresentationButton = styled.button``;

const MenuBar = () => {
  const { togglePresentationMode } = useUIState();
  const draggableBindings = useDraggableWindow();

  const minimizeWindow = () => {
    window.ipcRenderer.send("minimize-main-window");
  };
  const closeWindow = () => {
    window.ipcRenderer.send("close-main-window");
  };

  return (
    <Container {...draggableBindings}>
      <PresentationButton type="button" onClick={togglePresentationMode}>
        Presentation Mode
      </PresentationButton>
      <MinimizeButton type="button" onClick={minimizeWindow}>
        <MdMinimize />
      </MinimizeButton>
      <CloseButton type="button" onClick={closeWindow}>
        <MdClose />
      </CloseButton>
    </Container>
  );
};

export default MenuBar;
