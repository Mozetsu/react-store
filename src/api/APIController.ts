import axios from "axios";
import priceToNumber from "../lib";
import { ItemInterface } from "../interfaces";

const BASE_URL: string = "http://localhost:8081/store";

export default {
  // fetch all items from API
  getAll: async (): Promise<ItemInterface<number>[]> => {
    const { data } = await axios.get(`${BASE_URL}/parts`);
    return priceToNumber(data);
  },
  // fetch items by type
  getByType: async (type: string): Promise<ItemInterface<number>[]> => {
    const { data } = await axios.get(`${BASE_URL}/parts?type=${type}`);
    return priceToNumber(data);
  },
  // fetch items by query (input)
  getByQuery: async (query: string): Promise<ItemInterface<number>[]> => {
    const { data } = await axios.get(`${BASE_URL}/parts?query=${query}`);
    return priceToNumber(data);
  },
};
