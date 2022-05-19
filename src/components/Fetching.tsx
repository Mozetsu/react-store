import { Box, Center, Text, Spinner, Stack } from "@chakra-ui/react";

function Fetching() {
  return (
    <Box px="10" py="16" w="full" h="full">
      <Center>
        <Stack align="center" direction="row" spacing="3">
          <Spinner size="md" thickness="3px" />
          <Text fontSize="xl">Fetching Items...</Text>
        </Stack>
      </Center>
    </Box>
  );
}

export default Fetching;
