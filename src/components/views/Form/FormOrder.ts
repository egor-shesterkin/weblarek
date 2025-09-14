import { TPayment } from "../../../types";
import { settings } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IFormOrder {
  address: string;
  payment: TPayment;
}

export class FormOrder extends Form<IFormOrder> {

  protected cardButtonElement: HTMLButtonElement;
  protected cashButtonElement: HTMLButtonElement;
  protected addressElement: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {

    super(container, events);

    this.cardButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.cardButtonElement.addEventListener('click', () => {
      this.events.emit(settings.paymentCard);
    })

    this.cashButtonElement.addEventListener('click', () => {
      this.events.emit(settings.paymentCash);
    })

    this.addressElement.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const address = target.value;
      this.events.emit(settings.addressChanged, { address });
    })

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(settings.orderSubmit);
    })

  }

  set address(value: string) {
    if (value !== '') {
      this.addressElement.textContent = value;
    }
    else {
      this.addressElement.value = '';
    }
  }

  set payment(value: TPayment) {
    if (value === 'card') {
      this.cardButtonElement.classList.add('button_alt-active');
      this.cashButtonElement.classList.remove('button_alt-active');
    }

    else if (value === 'cash') {
      this.cashButtonElement.classList.add('button_alt-active');
      this.cardButtonElement.classList.remove('button_alt-active');
    }

    else {
      this.cashButtonElement.classList.remove('button_alt-active');
      this.cardButtonElement.classList.remove('button_alt-active');
    }
  }
}