import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `Jost, ${base.fonts.heading}`,
    body: `Jost, ${base.fonts.body}`,
  },
});

export default theme;
