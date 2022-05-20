import {
  theme as base,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { createContext, useMemo } from "react";
import { AppContextInterface } from "../interfaces/index";

const AppContext = createContext<AppContextInterface<Function> | null>(null);

type ChildrenType = {
  children: JSX.Element;
};

export function AppProvider({ children }: ChildrenType) {
  const { colorMode, toggleColorMode } = useColorMode();

  const primaryTextColor = useColorModeValue(
    base.colors.gray[600],
    base.colors.gray[300],
  );

  // memoize variables to avoid needless re-renders
  const value = useMemo(
    () => ({
      colorMode,
      primaryTextColor,
      toggleColorMode,
    }),
    [colorMode, toggleColorMode, primaryTextColor],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
