import { ItemInterface } from "../interfaces";

// receives object with [price] property as type <string
// returns object with [price] property to type <number>
const priceToNumber = (itemsArray: ItemInterface<string>[]): ItemInterface<number>[] =>
  // generates a new array with [price] properties being of type <number>
  itemsArray.map((item: ItemInterface<string>) => {
    const parsedPrice: number = parseInt(item.price.split("$")[0], 10);
    return { ...item, price: parsedPrice };
  });

export default priceToNumber;
