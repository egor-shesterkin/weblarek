import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

interface ICard {
  price: number | null
  title: string;
}

export class Card<T> extends Component<ICard> {
  protected priceElement: HTMLElement;
  protected titleElement: HTMLElement;

  constructor(container: HTMLElement, protected events?: IEvents) {
    super(container);

    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
  }

  set price(value: number) {
    if (value) {
      this.priceElement.textContent = `${value.toLocaleString('ru-RU')} синапсов`;
    }
    else {
      this.priceElement.textContent = 'Бесценно';
    }
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

}