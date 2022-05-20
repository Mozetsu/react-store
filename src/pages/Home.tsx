import { useCallback, useContext, useEffect, useState } from "react";
import _ from "lodash";
import { nanoid } from "nanoid";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Box, Container, Stack, Input, Select, Tooltip } from "@chakra-ui/react";
import { ItemInterface } from "../interfaces";
import APIController from "../api/APIController";

// components
import Navbar from "../components/Navbar";
import ItemsTable from "../components/ItemsTable";
import Item from "../components/Item";
import Fallback from "../components/Fallback";
import AppContext from "../context/AppContext";

function Home() {
  const [items, setItems] = useState<ItemInterface<number>[]>([]);
  const [itemsBackup, setItemsBackup] = useState<ItemInterface<number>[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [priceOrder, setPriceOrder] = useState<string>("ASC");

  const { primaryTextColor }: any = useContext(AppContext);

  // query API to get all existing items
  const fetchItems = async (): Promise<void> => {
    const fetchedItems = await APIController.getAll();
    setItems([...fetchedItems]);
    setItemsBackup([...fetchedItems]);
    setLoading(false);
  };

  // query API after 700ms
  const handleDebounceFn = async (
    query: string,
    items: ItemInterface<number>[],
    itemsBackup: ItemInterface<number>[],
  ): Promise<void> => {
    const validQuery = !!query.trim().length;

    if (!validQuery && query.split("").length > 0) return;

    if (!validQuery && !items.length) {
      setItems([...itemsBackup]);
      return;
    }

    if (!query.split("").length && items.length) {
      setItems([...itemsBackup]);
      return;
    }

    // reset state
    setItems([]);
    setLoading(true);

    // call API
    const queriedItems = await APIController.getByQuery(query.trim());

    setLoading(false);

    // update state
    setItems(queriedItems);
  };

  // stores the debounced function to be invoked
  const debounceFn = useCallback(_.debounce(handleDebounceFn, 700), []);

  // input (search bar) event handler
  const handleChange = (e: any): void => {
    setInput(e.target.value); // update input state
    debounceFn(e.target.value, items, itemsBackup); // call debounced function
  };

  // query API based on selected item type
  const handleItemType = async (e: any): Promise<void> => {
    setItems([]);
    setLoading(true);

    const selectedType = e.target.value;
    const fetchedItems = await APIController.getByType(selectedType);

    setLoading(false);
    setItems(fetchedItems);
  };

  // sort items by price, either in ascending or descending order
  const handlePriceOrder = (): void => {
    setItems((prevItems) => {
      // sort items by price
      const sortedItems: ItemInterface<number>[] = prevItems?.sort((a, b) => {
        const ascOrder = a.price > b.price ? 1 : -1;
        const descOrder = a.price < b.price ? 1 : -1;
        return priceOrder === "ASC" ? ascOrder : descOrder;
      });

      // update price order state
      setPriceOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));

      // return sorted items array if it exists
      return [...sortedItems];
    });
  };

  // fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // generate a list of JSX elements (items) to be rendered
  const itemsList = items.map((item: ItemInterface<number>) => (
    <Item key={nanoid()} name={item.name} price={item.price} type={item.type} />
  ));

  return (
    <Container color={primaryTextColor} maxW="container.lg">
      <Stack spacing={4} py="6">
        <Navbar />
        <Stack spacing={4} direction={{ base: "column", md: "row" }}>
          <Input value={input} onChange={handleChange} w="full" placeholder="Search" size="lg" />
          <Stack w="auto" spacing="4" direction={["column", "row"]}>
            <Select onChange={handleItemType} w={["full", "sm"]} placeholder="Type" size="lg">
              <option value="mouse">Mouse</option>
              <option value="keyboard">Keyboard</option>
              <option value="monitor">Monitor</option>
              <option value="mousepad">Mousepad</option>
            </Select>
            <Tooltip label="Sort by price" aria-label="Price order tooltip">
              <Box
                onClick={handlePriceOrder}
                as="button"
                borderRadius="md"
                borderWidth="1px"
                px={7}
                h={12}
                w="full"
              >
                Price
                {priceOrder === "ASC" ? (
                  <ArrowUpIcon boxSize="1.2em" ml="2" mb="0.5" />
                ) : (
                  <ArrowDownIcon boxSize="1.2em" ml="2" mb="0.5" />
                )}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
        {itemsList.length ? <ItemsTable items={itemsList} /> : <Fallback isLoading={loading} />}
      </Stack>
    </Container>
  );
}

export default Home;
