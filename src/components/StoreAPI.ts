import { ApiOrderRequest, ApiOrderResponse, ApiProductListResponse, IProduct, IStoreAPI } from "../types";
import { Api } from "./base/Api";

export class StoreAPI extends Api implements IStoreAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProductList(): Promise<IProduct[]> {
    const result = this.get<ApiProductListResponse<IProduct>>('/product').then((data) =>
      data.items.map((item: IProduct) => ({
        ...item,
        image: this.cdn + item.image
      }))
    );

    return result;
  }

  buyProducts(buyer: ApiOrderRequest): Promise<ApiOrderResponse> {
    return this.post<ApiOrderResponse>('/order', buyer).then(
      (data) => data
    );
  }

}