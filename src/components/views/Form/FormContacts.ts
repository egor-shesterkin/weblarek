import { settings } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IFormContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContacts> {

  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {

    super(container, events);

    this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this.emailElement.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const email = target.value;
      this.events.emit(settings.emailChanged, { email });
    })

    this.phoneElement.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const phone = target.value;
      this.events.emit(settings.phoneChanged, { phone });
    })

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(settings.contactsSubmit);
    })

  }

  set email(value: string) {
    if (value !== '') {
      this.emailElement.textContent = value;
    }
    else {
      this.emailElement.value = '';
    }
  }

  set phone(value: string) {
    if (value !== '') {
      this.phoneElement.textContent = value;
    }
    else {
      this.phoneElement.value = '';
    }
  }
}