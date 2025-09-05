import { IProduct } from "../../types";

export class Basket {
  private productsInBasket: IProduct[] = [];

  getProductsInBasket(): IProduct[] {
    return this.productsInBasket;
  }

  setProductInBasket(product: IProduct): void {
    this.productsInBasket.push(product);
  }

  getProductInBasket(id: string): IProduct | undefined {
    return this.productsInBasket.find(product => product.id === id);
  }

  clearProductInBasket(id: string): void {
    this.productsInBasket = this.productsInBasket.filter(product => product.id !== id);
  }

  clearBasket(): void {
    this.productsInBasket = [];
  }

  getCostOfProductsInBasket(): number {
    return this.productsInBasket?.reduce((sum, product) =>
      sum + (Number(product.price) || 0), 0) || 0;
  }

  getNumberOfProductsInBasket(): number {
    return this.productsInBasket.length;
  }

}