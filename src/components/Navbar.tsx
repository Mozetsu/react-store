import { useContext } from "react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import AppContext from "../context/AppContext";

function Navbar() {
  const { colorMode, primaryTextColor, toggleColorMode }: any =
    useContext(AppContext);

  return (
    <>
      <Stack
        direction="row"
        align="center"
        justifyContent="space-between"
        color={primaryTextColor}
      >
        <Text fontWeight="bold" fontSize={["md", "xl"]}>
          React Store
        </Text>
        <Stack direction="row" align="center" spacing={["4", "10"]}>
          <Link to="/">
            <Button variant="link" color={primaryTextColor}>
              Home
            </Button>
          </Link>
          <Link to="/parts">
            <Button variant="link" color={primaryTextColor}>
              Parts
            </Button>
          </Link>
          <Tooltip label="Toggle theme" aria-label="Theme toggle tooltip">
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              aria-label="Theme toggle"
            />
          </Tooltip>
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}

export default Navbar;
