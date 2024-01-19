import { CardValidationWidget } from "./widget";

export class Controller {
  constructor() {
    this.container = null;
    this.form = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;

    this.validEl = this.container.querySelector(Controller.validSelector);
    this.notvalidEl = this.container.querySelector(Controller.notvalidSelector);
    this.reasonEl = this.container.querySelector(Controller.reasonSelector);

    const callback = this.onSubmit.bind(this);
    const formContainer = this.container.querySelector(".container");
    const form = new CardValidationWidget(formContainer, callback);

    form.bindToDOM();
  }

  static get validSelector() {
    return ".valid";
  }

  static get notvalidSelector() {
    return ".notvalid";
  }

  static get reasonSelector() {
    return ".reason-title";
  }

  onSubmit(result) {
    this.reasonEl.textContent = "";
    if (result.success) {
      if (this.validEl.classList.contains("hidden")) {
        this.validEl.classList.remove("hidden");
      }
      if (!this.notvalidEl.classList.contains("hidden")) {
        this.notvalidEl.classList.add("hidden");
      }
    } else {
      this.reasonEl.textContent = result.errorMessage;
      if (this.notvalidEl.classList.contains("hidden")) {
        this.notvalidEl.classList.remove("hidden");
      }
      if (!this.validEl.classList.contains("hidden")) {
        this.validEl.classList.add("hidden");
      }
    }
  }
}
