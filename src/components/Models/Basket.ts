import { settings } from '../../utils/constants';
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
  private productsInBasket: IProduct[] = [];

  constructor(protected events: IEvents) {

  }

  getProductsInBasket(): IProduct[] {
    return this.productsInBasket;
  }

  setProductInBasket(product: IProduct): void {
    this.productsInBasket.push(product);
    this.events.emit(settings.basketChanged);
    this.events.emit(settings.cardChanged, product);
  }

  getProductInBasket(id: string): IProduct | undefined {
    return this.productsInBasket.find(product => product.id === id);
  }

  clearProductInBasket(id: string): void {
    this.productsInBasket = this.productsInBasket.filter(product => product.id !== id);
    this.events.emit(settings.cardChanged, { item: id });
    this.events.emit(settings.basketChanged);
  }

  clearBasket(): void {
    this.productsInBasket = [];
    this.events.emit(settings.basketChanged);
  }

  getCostOfProductsInBasket(): number {
    return this.productsInBasket?.reduce((sum, product) =>
      sum + (Number(product.price) || 0), 0) || 0;
  }

  getNumberOfProductsInBasket(): number {
    return this.productsInBasket.length;
  }

}