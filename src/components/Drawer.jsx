import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useUIState } from "../contexts/UIContext";

const Container = styled(motion.div)`
  /* border: 1px dashed white; */

  overflow: hidden;

  /* height: 100%; */
  /* min-height: 100%; */

  width: 250px;
  /* width: 100%; */
  /* position: absolute; */

  background-color: rgba(0, 0, 0, 1);

  overflow: hidden;
`;

const Drawer = () => {
  const { drawerState, setDrawerState, toggleDrawer } = useUIState();

  const animProps = {
    variants: {
      open: {
        // height: 250
        width: 250,
      },
      closed: {
        // height: 14,
        width: 2,
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
      }}
    ></Container>
  );
};

export default Drawer;
