import { Tr, Td } from "@chakra-ui/react";

interface ItemInterface {
  name: string;
  price: number;
  type: string;
}

function Item({ name, price, type }: ItemInterface) {
  return (
    <Tr p="12">
      <Td>{name}</Td>
      <Td>{type}</Td>
      <Td isNumeric>{price}$</Td>
    </Tr>
  );
}

export default Item;
