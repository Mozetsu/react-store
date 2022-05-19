import { TableContainer, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";

interface ItemsTableInterface {
  items: JSX.Element[];
}

function ItemsTable({ items }: ItemsTableInterface) {
  return (
    <TableContainer borderWidth="1px" borderRadius="sm">
      <Table size="lg" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        <Tbody>{items}</Tbody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
