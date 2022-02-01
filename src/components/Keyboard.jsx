import styled from "@emotion/styled";
import { useState } from "react";
import { useUIState } from "../contexts/UIContext";
import useLocalStorage from "../hooks/useLocalStorage";
import ORTHO_QWERTY from "../keyboard-layouts/ortho-qwerty-60.json";
import KeyboardLayout from "./KeyboardLayout";
import KeyboardSelect from "./KeyboardSelect";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Keyboard = () => {
  const {
    selectedLayout,
    layouts,
    setLayouts,
    addLayout,
    removeLayout,
    layoutIdSelected,
    setLayoutIdSelected,
    editLayout,
  } = useLocalStorage();

  const { presentationMode } = useUIState();

  const editSelectedLayout = (keyId, values) =>
    editLayout(layoutIdSelected, keyId, values);

  return (
    <Container>
      {!presentationMode && (
        <KeyboardSelect
          selectedLayout={selectedLayout}
          layouts={layouts}
          removeLayout={removeLayout}
          setLayoutIdSelected={setLayoutIdSelected}
        />
      )}
      <KeyboardLayout
        layoutConfig={selectedLayout}
        editLayout={editSelectedLayout}
      ></KeyboardLayout>
    </Container>
  );
};

export default Keyboard;
