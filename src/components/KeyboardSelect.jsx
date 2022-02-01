import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useUIState } from "../contexts/UIContext";
import useLocalStorage from "../hooks/useLocalStorage";
import DynamicPortal from "./DynamicPortal";

const Container = styled.div`
  width: 100%;
  height: 3rem;
  background-color: salmon;
  padding: 0.5rem;

  display: flex;
  justify-content: flex-end;
  justify-content: flex-start;
  align-items: center;
`;

const B = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  height: 2rem;
  padding: 0 0.5rem;
`;

const Input = styled.input``;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed blue;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;

  /* overflow: auto; */
  /* height: 3rem; */
  width: 40rem;
`;

const Item = styled.li`
  /* border: 1px solid red; */

  &:hover {
    span {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

const ItemName = styled.span`
  user-select: none;
  cursor: default;

  font-weight: 700;
  font-size: 3rem;
`;

const X = styled.span`
  border: 1px solid blue;
  color: blue;
`;

const LayoutName = styled.h2`
  border: 1px solid blue;
  color: blue;
`;

const KeyboardSelect = ({
  selectedLayout,
  layouts,
  removeLayout,
  setLayoutIdSelected,
}) => {
  const { togglePresentationMode } = useUIState();

  const [showList, setShowList] = useState(false);
  const toggleShowList = () => setShowList((v) => !v);

  return (
    <Container>
      <LayoutName onClick={toggleShowList}>{selectedLayout.name}</LayoutName>

      {showList && (
        <DynamicPortal portalId="main" backdrop close={toggleShowList}>
          <ListContainer>
            <List>
              {layouts.map((layout) => (
                <Item
                  key={layout.id}
                  onClick={() => {
                    setLayoutIdSelected(layout.id);
                    toggleShowList();
                  }}
                >
                  {layout.custom && (
                    <X onClick={() => removeLayout(layout.id)}>X</X>
                  )}
                  <ItemName>{layout.name}</ItemName>
                </Item>
              ))}
            </List>
          </ListContainer>
        </DynamicPortal>
      )}

      {/* <X onClick={() => {}}>add</X> */}
      {/* <Input
        type="file"
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.files[0])}
      /> */}
      <B type="button" onClick={togglePresentationMode}>
        Present
      </B>
    </Container>
  );
};

export default KeyboardSelect;
