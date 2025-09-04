import { IBuyer, TPayment } from "../../types";

export class Buyer {
  private payment: TPayment = '';
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  setBuyerData(buyer: IBuyer): void {
    this.payment = buyer.payment;
    this.email = buyer.email;
    this.phone = buyer.phone;
    this.address = buyer.address;
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
  
  validateBuyerData(buyer: IBuyer): void {
    if (buyer.payment !== 'cash' && buyer.payment !== 'card') {
      console.log('Ошибка валидации: Неверный способ оплаты');
    }

    if (buyer.address === '') {
      console.log('Ошибка валидации: Не указан адрес');
    }

    if (buyer.email === '') {
      console.log('Ошибка валидации: Не указан email');
    }

    if (buyer.phone === '') {
      console.log('Ошибка валидации: Не указан телефон');
    }

  }
}