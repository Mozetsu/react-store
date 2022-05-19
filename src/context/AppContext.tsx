import {
  theme as base,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { createContext, useMemo } from "react";

interface AppContextInterface {
  colorMode: string;
  primaryTextColor: string;
  toggleColorMode(): any;
}

interface ChildrenInterface {
  children: JSX.Element;
}

const AppContext = createContext<AppContextInterface | null>(null);

export function AppProvider({ children }: ChildrenInterface) {
  const { colorMode, toggleColorMode } = useColorMode();

  const primaryTextColor = useColorModeValue(
    base.colors.gray[600],
    base.colors.gray[300],
  );

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
