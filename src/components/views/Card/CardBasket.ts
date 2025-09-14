import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card, ICardActions } from "./Card";

export type TCardBasket = Pick<IProduct, 'price' | 'title'> & {
  index: string;
};

export class CardBasket extends Card<TCardBasket> {
  protected itemIndex: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ICardActions) {
    super(container);

    this.itemIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if (actions.onClick) {
      this.buttonElement.addEventListener('click', actions.onClick);
    }

  }

  set index(value: string) {
    this.itemIndex.textContent = value;
  }
}