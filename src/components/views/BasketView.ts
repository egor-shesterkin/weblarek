import { settings } from '../../utils/constants';
import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class BasketView extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    if (this.basketButton) {
      this.basketButton.addEventListener('click', () => {
        events.emit(settings.orderOpen);
      });
    }

  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.listElement.replaceChildren(...items);
      this.setDisabled(this.basketButton, false);
    } else {
      this.listElement.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста',
        className: 'paragraph'
      }));

      const paragraph = this.listElement.querySelector('.paragraph') as HTMLElement;
      
      if (paragraph) {
      paragraph.style.opacity = '0.3';
      }
      
      this.setDisabled(this.basketButton, true);
    }
  }

  set total(total: number) {
    this.totalElement.textContent = `${total.toLocaleString('ru-RU')} синапсов`;
  }
}