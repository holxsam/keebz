import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MdClose, MdMinimize } from "react-icons/md";
import { useUIState } from "../contexts/UIContext";

import { useEffect, useRef, useState } from "react";
import useDraggableWindow from "../hooks/useDraggableWindow";

const Container = styled.div`
  /* -webkit-app-region: drag; */
  user-select: none;

  height: 32px;
  padding: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 0.35rem;
`;

const buttonStyles = css`
  -webkit-app-region: no-drag;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border-radius: 50%;

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
  /* background-color: #f28fad; */
  ${buttonStyles}
`;

const MinimizeButton = styled.button`
  background-color: #49d0b0;
  background-color: #fae3b0;
  background-color: #ffe27c;

  ${buttonStyles}
`;

const PresentationButton = styled.button``;

const MenuBar = () => {
  const [rightClicks, setRightClicks] = useState(0);

  const { togglePresentationMode } = useUIState();
  const draggableBindings = useDraggableWindow();

  const minimizeWindow = () => {
    window.ipcRenderer.send("minimize-main-window");
  };
  const closeWindow = () => {
    window.ipcRenderer.send("close-main-window");
  };

  return (
    <Container
      onContextMenu={(e) => {
        console.log("RIGHT CLICKED");
        setRightClicks((v) => v + 1);
      }}
      {...draggableBindings}
    >
      {rightClicks}
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
