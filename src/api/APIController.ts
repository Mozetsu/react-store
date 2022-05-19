import axios from "axios";

const BASE_URL: string = "http://localhost:8081/store";

interface QueriedItem {
  name: string;
  price: string;
  type: string;
}

interface ParsedItem {
  name: string;
  price: number;
  type: string;
}

// convert price property to number
const priceToNumber = (itemsArray: QueriedItem[]): ParsedItem[] => {
  const parsedItems = itemsArray.map((item) => {
    const parsedPrice: number = parseInt(item.price.split("$")[0], 10);
    return { ...item, price: parsedPrice };
  });

  return parsedItems;
};

export default {
  getAll: async () => {
    const { data } = await axios.get<QueriedItem[]>(`${BASE_URL}/parts`);
    return priceToNumber(data);
  },
  getByType: async (type: string) => {
    const { data } = await axios.get<QueriedItem[]>(
      `${BASE_URL}/parts?type=${type}`,
    );
    return priceToNumber(data);
  },
  getByQuery: async (query: string) => {
    const { data } = await axios.get<QueriedItem[]>(
      `${BASE_URL}/parts?query=${query}`,
    );
    return priceToNumber(data);
  },
};
