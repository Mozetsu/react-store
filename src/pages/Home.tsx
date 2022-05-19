import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Box, Container, Stack, Input, Select } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import _ from "lodash";
import APIController from "../api/APIController";

// components
import Navbar from "../components/Navbar";
import ItemsTable from "../components/ItemsTable";
import Item from "../components/Item";
import Fetching from "../components/Fetching";

interface ItemInterface {
  name: string;
  price: number;
  type: string;
}

function Home() {
  const [items, setItems] = useState<ItemInterface[]>([]);
  const [input, setInput] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<string>("ASC");

  // query API to get all existing items
  const fetchItems = async () => {
    const fetchedItems = await APIController.getAll();
    setItems(fetchedItems);
  };

  const handleDebounceFn = async (query: string) => {
    setItems([]);
    const queriedItems = await APIController.getByQuery(query);
    setItems(queriedItems);
  };

  const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), [
    handleDebounceFn,
    _.debounce,
  ]);

  const handleChange = (e: any) => {
    setInput(e.target.value);
    debounceFn(e.target.value);
  };

  // query API based on selected item type
  const handleItemType = async (e: any) => {
    setItems([]);
    const selectedType = e.target.value;
    const fetchedItems = await APIController.getByType(selectedType);
    setItems(fetchedItems);
  };

  // sort items by price, either in ascending or descending order
  const handlePriceOrder = () => {
    setItems((prevItems) => {
      // sort items by price
      const sortedItems = prevItems.sort((a, b) => {
        const ascOrder = a.price > b.price ? 1 : -1;
        const descOrder = a.price < b.price ? 1 : -1;
        return priceOrder === "ASC" ? ascOrder : descOrder;
      });

      // update price order state
      setPriceOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));

      // return sorted items array
      return [...sortedItems];
    });
  };

  // fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // generate a list of items' JSX elements to be displayed
  const itemsList = items.map((item: ItemInterface) => (
    <Item key={nanoid()} name={item.name} price={item.price} type={item.type} />
  ));

  return (
    <Container maxW="container.lg">
      <Stack spacing={4} py="6">
        <Navbar />
        <Stack spacing={4} direction={{ base: "column", md: "row" }}>
          <Input
            value={input}
            onChange={handleChange}
            w="full"
            placeholder="Search"
            size="lg"
          />
          <Stack w="auto" spacing="4" direction={["column", "row"]}>
            <Select
              onChange={handleItemType}
              w={["full", "sm"]}
              placeholder="Type"
              size="lg"
            >
              <option value="mouse">Mouse</option>
              <option value="keyboard">Keyboard</option>
              <option value="monitor">Monitor</option>
              <option value="mousepad">Mousepad</option>
            </Select>
            <Box
              onClick={handlePriceOrder}
              as="button"
              justifyItems="flex-start"
              borderRadius="md"
              borderWidth="1px"
              color="white"
              px={7}
              h={12}
              w="full"
            >
              Price
              {priceOrder === "ASC" ? (
                <ArrowUpIcon boxSize="1.2em" />
              ) : (
                <ArrowDownIcon boxSize="1.2em" />
              )}
            </Box>
          </Stack>
        </Stack>
        {itemsList.length ? <ItemsTable items={itemsList} /> : <Fetching />}
      </Stack>
    </Container>
  );
}

export default Home;
