import { ApiOrderRequest, ApiOrderResponse, ApiProductListResponse, IProduct } from "../types";
import { Api } from "./base/Api";

export class StoreAPI {
  readonly cdn: string;
  api: Api;

  constructor(cdn: string, api: Api) {
    this.api = api;
    this.cdn = cdn;
  }

  getProductList(): Promise<IProduct[]> {
    return this.api.get<ApiProductListResponse<IProduct>>('/product').then((data) =>
      data.items.map((item: IProduct) => ({
        ...item,
        image: this.cdn + item.image
      }))
    );

  }

  buyProducts(buyer: ApiOrderRequest): Promise<ApiOrderResponse> {
    return this.api.post<ApiOrderResponse>('/order', buyer)
  }

}