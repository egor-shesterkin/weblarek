import { settings } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  cost: string
}

export class Success extends Component<ISuccess> {
  protected totalCostElement: HTMLElement;
  protected closeButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.totalCostElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.closeButtonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.closeButtonElement.addEventListener('click', () => {
      this.events.emit(settings.modalClose);
    })

  }

  set cost(value: number) {
    this.totalCostElement.textContent = `Списано ${value} синапсов`;
  }

}