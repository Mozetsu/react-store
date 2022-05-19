import { Container, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function Parts() {
  return (
    <Container maxW="container.lg">
      <Stack spacing={4} py="6">
        <Navbar />
      </Stack>
    </Container>
  );
}

export default Parts;
