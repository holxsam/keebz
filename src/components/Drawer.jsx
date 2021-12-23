import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useUIState } from "../contexts/UIContext";

const Container = styled(motion.div)`
  /* border: 1px solid white; */
  width: 100%;
  position: absolute;

  background-color: rgba(0, 0, 0, 0.5);

  overflow: hidden;
`;

const Drawer = () => {
  const { drawerState, setDrawerState, toggleDrawer } = useUIState();

  const animProps = {
    variants: {
      open: { height: 250 },
      closed: {
        height: 14,
      },
    },
    initial: "closed",
    animate: drawerState ? "open" : "closed",
    exit: "closed",
    transition: { duration: 0.25 },
    // transition: { velocity: 500 },
  };

  return (
    <Container
      id="drawer"
      {...animProps}
      onClick={() => {
        toggleDrawer();
        console.log("uhh", drawerState);
      }}
    ></Container>
  );
};

export default Drawer;
