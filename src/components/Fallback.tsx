import { Box, Center, Text, Spinner, Stack } from "@chakra-ui/react";

type PropType = {
  isLoading: boolean;
};

function Fallback({ isLoading }: PropType) {
  return (
    <Box px="10" py="16" w="full" h="full">
      <Center>
        <Stack align="center" direction="row" spacing="3">
          {isLoading ? (
            <>
              <Spinner size="md" thickness="3px" />
              <Text fontSize="xl">Fetching Items...</Text>
            </>
            ) : (
            <Text fontSize="xl">Nothing Here!</Text>
          )}
        </Stack>
      </Center>
    </Box>
  );
}

export default Fallback;
