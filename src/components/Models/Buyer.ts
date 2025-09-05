import { IBuyer, IBuyerValidate, TPayment } from "../../types";

export class Buyer {
  private payment?: TPayment = '';
  private email?: string = '';
  private phone?: string = '';
  private address?: string = '';

  setBuyerData(buyer: IBuyer): void {
    this.payment = buyer.payment ?? '';
    this.email = buyer.email ?? '';;
    this.phone = buyer.phone ?? '';;
    this.address = buyer.address ?? '';; 
  }

  getBuyerData(): IBuyer {
    return {payment: this.payment, email: this.email, phone: this.phone, address: this.address}
  }
  
  clearBuyerData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }
  
  validateBuyerData(): IBuyerValidate {

    return {payment: this.payment? '' : 'Неверный способ оплаты', 
            email: this.email? '' : 'Не указан email', 
            phone: this.phone? '' : 'Не указан телефон', 
            address: this.address? '' : 'Не указан адрес'};

  }
}