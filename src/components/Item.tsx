import { Tr, Td, Link, Tag } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

interface ItemInterface {
  name: string;
  price: number;
  type: string;
}

function Item({ name, price, type }: ItemInterface) {
  return (
    <Tr p="12">
      <Td>
        <Link
          as={ReactLink}
          to={`/parts?query=${name}`}
          state={{ name, price, type }}
        >
          {name}
        </Link>
      </Td>
      <Td>
        <Tag borderRadius="2" colorScheme="purple">
          {type}
        </Tag>
      </Td>
      <Td isNumeric>{price}$</Td>
    </Tr>
  );
}

export default Item;
