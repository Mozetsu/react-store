// [price] property comes from API as type <string>
// is parsed to type <number> when in client
// this is useful for sorting items by [price]
export interface ItemInterface<T> {
  name: string;
  price: T;
  type: string;
}

export interface AppContextInterface<T> {
  colorMode: string;
  primaryTextColor: string;
  toggleColorMode(): T | void;
}
