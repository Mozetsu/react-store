import { useContext } from "react";
import { Box, Container, Divider, Stack, Text, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import AppContext from "../context/AppContext";

function NotFound() {
  const { primaryTextColor }: any = useContext(AppContext);

  return (
    <Container h="100vh" color={primaryTextColor} maxW="container.lg">
      <Stack h="full" justify="center" py="6">
        <Box p={7}>
          <Stack spacing="8">
            <Text textAlign="center" fontSize="xl" fontWeight="bold">
              Oops, page is missing!
            </Text>
            <Divider />
            <Text textAlign="center" fontSize="8xl" fontWeight="bold">
              404
            </Text>
            <Divider />
            <Link
              borderWidth="3px"
              borderRadius="sm"
              textAlign="center"
              fontWeight="bold"
              p="2"
              as={ReactLink}
              to="/"
            >
              Back to Home
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default NotFound;
