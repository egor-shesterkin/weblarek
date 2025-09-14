import { IBuyer, IBuyerValidate, TPayment } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/Events";

export class Buyer {
  private payment?: TPayment = '';
  private email?: string = '';
  private phone?: string = '';
  private address?: string = '';

  constructor(protected events: IEvents) {

  }

  setBuyerData(buyer: IBuyer): void {
    this.payment = buyer.payment ?? '';
    this.email = buyer.email ?? '';;
    this.phone = buyer.phone ?? '';;
    this.address = buyer.address ?? '';;

    this.events.emit(settings.buyerChanged);
  }

  getBuyerData(): IBuyer {
    return { payment: this.payment, email: this.email, phone: this.phone, address: this.address }
  }

  clearBuyerData(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.events.emit(settings.buyerDataCleared);
  }

  validateBuyerData(): IBuyerValidate {
    this.events.emit(settings.formErrorsChanged, {
      payment: this.payment ? '' : 'Неверный способ оплаты',
      email: this.email ? '' : 'Не указан email',
      phone: this.phone ? '' : 'Не указан телефон',
      address: this.address ? '' : 'Не указан адрес'
    });
    return {
      payment: this.payment ? '' : 'Неверный способ оплаты',
      email: this.email ? '' : 'Не указан email',
      phone: this.phone ? '' : 'Не указан телефон',
      address: this.address ? '' : 'Не указан адрес'
    };

  }
}