import { IProduct } from "../../types";

export class Products {
  private items: IProduct[] = [];
  private item: IProduct = {
    id: "",
    description: "",
    image: "",
    title: "",
    category: "",
    price: null
  };

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  setItem(item: IProduct): void {
    this.item = item;
  }

  getItem(): IProduct {
    return this.item;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

}