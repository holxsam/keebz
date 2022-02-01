import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useUIState } from "../contexts/UIContext";

const Container = styled(motion.div)`
  /* border: 1px dashed white; */
  position: relative;

  overflow: hidden;

  /* height: 100%; */
  /* min-height: 100%; */

  width: 250px;
  /* width: 100%; */
  /* position: absolute; */

  background-color: rgba(0, 0, 0, 1);

  overflow: hidden;
`;

const FloatingButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;

  width: 2rem;
  height: 2rem;
`;

const Drawer = () => {
  const { drawerState, setDrawerState, toggleDrawer, presentationMode } =
    useUIState();

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  const initialRender = renderCount.current === 0 ? 1 : 0;

  const delay = presentationMode ? 0 : 0.2 * initialRender;
  // when present is false -> delay to be 0
  // when present is true -> delay to be 0.2

  const animProps = {
    variants: {
      open: {
        // height: 250
        width: 250,
        transition: { duration: 0.25, delay: delay },
      },
      closed: {
        // height: 14,
        width: 0,
        transition: { duration: 0.25 },
      },
    },
    initial: "closed",
    animate: drawerState ? "open" : "closed",
    exit: "closed",
    // transition: { duration: 0.25 },
    // transition: { velocity: 500 },
  };

  return (
    <Container
      id="drawer"
      {...animProps}
      onClick={() => {
        toggleDrawer();
      }}
    ></Container>
  );
};

export default Drawer;
