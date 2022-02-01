import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MdClose, MdMinimize, MdMenu } from "react-icons/md";
import { useUIState } from "../contexts/UIContext";

import { useEffect, useRef, useState } from "react";
import useDraggableWindow from "../hooks/useDraggableWindow";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  user-select: none;

  background-color: ${({ theme }) => theme.colors.background.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.main};
  /* border-bottom: 1px solid white; */
  /* width: 100%; */
  /* height: 32px; */
  padding: 0.5rem;

  display: flex;
  align-items: center;
  /* justify-content: flex-end; */

  gap: 0.35rem;

  overflow: hidden;
`;

const buttonStyles = css`
  width: 20px;
  height: 20px;
  border-radius: 6px;
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
  ${buttonStyles}
`;

const MinimizeButton = styled.button`
  background-color: #ffe27c;
  ${buttonStyles}
`;

const MenuButton = styled(motion.button)`
  ${buttonStyles}

  width:24px;
  height: 24px;
  background-color: transparent;

  svg {
    width: 100%;
    height: 100%;
    fill: white;
  }

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.primary.main};
    }
    /* background-color: ${({ theme }) => theme.colors.background.darker}; */
  }
`;

const Title = styled.h1`
  color: white;
  font-weight: 600;
  flex: 1;

  display: flex;
  justify-content: center;
`;

const PresentationButton = styled.button``;

const MenuBar = () => {
  const {
    togglePresentationMode,
    presentationMode,
    drawerState,
    toggleDrawer,
  } = useUIState();
  const { eventBindings } = useDraggableWindow();

  const animProps = {
    variants: {
      open: {
        height: 32,
        padding: 7,
        transition: { duration: 0.25, delay: 0 },
      },
      closed: {
        height: 0,
        padding: 0,
        transition: { duration: 0.25, delay: 0.2 },
      },
    },
    initial: "closed",
    // animate: presentationMode ? "closed" : "open",
    animate: "open",
    //  animate: drawerState ? "open" : "closed",
    exit: "closed",
    // transition: { duration: 0.25, delay: 0.2 },
    // transition: { velocity: 500 },
  };

  const menuButtonAnimProps = {
    variants: {
      rotate: {
        rotate: 180,
      },
      normal: {
        rotate: 0,
      },
    },
    initial: "normal",
    animate: drawerState ? "rotate" : "normal",
    exit: "normal",
    transition: { duration: 0.25 },
  };

  const minimizeWindow = () => {
    window.ipcRenderer.send("minimize-main-window");
  };
  const closeWindow = () => {
    window.ipcRenderer.send("close-main-window");
  };

  return (
    <Container {...eventBindings} {...animProps}>
      <MenuButton type="button" onClick={toggleDrawer} {...menuButtonAnimProps}>
        <MdMenu />
      </MenuButton>
      <Title>Keebz</Title>

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
