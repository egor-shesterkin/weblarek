import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { settings } from '../../utils/constants';

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

  constructor(protected events: IEvents) {
    
  }

  setItems(items: IProduct[]): void {
    this.items = items;
    this.events.emit(settings.catalogChanged);
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