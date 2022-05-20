import { useContext } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Divider, IconButton, Stack, Text, Tooltip } from "@chakra-ui/react";
import AppContext from "../context/AppContext";

function Navbar() {
  const { colorMode, primaryTextColor, toggleColorMode }: any = useContext(AppContext);

  return (
    <>
      <Stack direction="row" align="center" justifyContent="space-between" color={primaryTextColor}>
        <Text fontWeight="bold" fontSize={["md", "xl"]}>
          React Store
        </Text>
        <Tooltip label="Toggle theme" aria-label="Theme toggle tooltip">
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            aria-label="Theme toggle"
          />
        </Tooltip>
      </Stack>
      <Divider />
    </>
  );
}

export default Navbar;
