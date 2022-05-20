import {
  Box,
  Container,
  Divider,
  HStack,
  Link,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link as ReactLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppContext from "../context/AppContext";
import { ItemInterface } from "../interfaces/index";

function Parts() {
  const [item, setItem] = useState<ItemInterface<number> | null>(null);

  const { primaryTextColor }: any = useContext(AppContext);

  const location: any = useLocation();

  useEffect(() => {
    setItem(location.state);
  }, []);

  return (
    <Container color={primaryTextColor} maxW="container.lg">
      <Stack spacing={4} py="6">
        <Navbar />
        {item && (
          <Box borderWidth="1px" borderRadius="md" p={7}>
            <Stack spacing="6">
              <HStack spacing="4">
                <Text fontWeight="bold" fontSize={{ base: "3xl", md: "5xl" }}>
                  {item?.name}
                </Text>
                <Tag
                  p={{ base: "2", md: "3" }}
                  fontSize={{ base: "md", md: "2xl" }}
                  colorScheme="purple"
                >
                  {item?.type}
                </Tag>
              </HStack>
              <Divider />
              <Text fontSize={{ base: "4xl", md: "5xl" }}>{item?.price}$</Text>
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
        )}
      </Stack>
    </Container>
  );
}

export default Parts;
