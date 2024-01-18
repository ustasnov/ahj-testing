import { isValidCardNumber } from "./validators";

export class CardValidationWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
        <div class="cardvalidation-widget">
          <div class="pay-systems">
            <div class="pay-system visa"></div>
            <div class="pay-system mastercard"></div>
            <div class="pay-system mir"></div>
            <div class="pay-system americanexpress"></div>
            <div class="pay-system discover"></div>
            <div class="pay-system jcb"></div>
            <div class="pay-system diners"></div>
          </div>
          <form class="validation-form">
              <div class="control">
                  <input type="text" id="cardnumber-input" class="input" placeholder="Номер платежной карты">
              </div>
              <button class="submit">Проверить</button>
          </form>
        </div>
        `;
  }

  static get submitSelector() {
    return ".submit";
  }

  static get inputSelector() {
    return ".input";
  }

  static get selector() {
    return ".cardvalidation-widget";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardValidationWidget.markup;

    this.element = this.parentEl.querySelector(CardValidationWidget.selector);
    this.submit = this.element.querySelector(
      CardValidationWidget.submitSelector
    );
    this.input = this.element.querySelector(CardValidationWidget.inputSelector);

    this.element.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    const value = this.input.value;
    const result = isValidCardNumber(value);
    console.log(`result: ${result.success}`);
  }
}
