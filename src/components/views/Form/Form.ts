import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IForm {
  errors: string[];
  isValid: boolean;
}

export class Form<T> extends Component<IForm> {

  protected errorsElement: HTMLElement;
  protected submitButtonElement: HTMLButtonElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
    this.submitButtonElement = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  set isValid(value: boolean) {
    this.submitButtonElement.disabled = !value;
  }
}