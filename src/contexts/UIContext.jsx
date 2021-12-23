import { useTheme } from "@emotion/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// type State = {
//   isMobile: boolean;
//   sidebarState: boolean;
//   setSidebarState: Dispatch<SetStateAction<boolean>>;

//   // dropPosition: React.MutableRefObject<{
//   //   x: number;
//   //   y: number;
//   // }>;
//   // setDropPosition: (val: { x: number; y: number }) => void;
//   dropPosition: {
//     x: number;
//     y: number;
//   };
//   setDropPosition: React.Dispatch<
//     React.SetStateAction<{
//       x: number;
//       y: number;
//     }>
//   >;
//   toggleSidebar: () => void;
// };

// type UIProviderProps = {
//   children: React.ReactNode;
// };

const UIStateContext = createContext(undefined);

const UIStateProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.s}px)`,
  });
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => setDrawerState((v) => !v);

  // const scrollRef = useRef<HTMLElement>();

  return (
    <UIStateContext.Provider
      value={{
        isMobile,
        drawerState,
        setDrawerState,
        toggleDrawer,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

const useUIState = () => {
  const context = useContext(UIStateContext);
  if (context === undefined)
    throw new Error("useUIState must be used within a UIStateProvider");
  return context;
};

export { UIStateProvider, useUIState };
