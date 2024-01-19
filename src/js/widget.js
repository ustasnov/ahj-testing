import { isValidCardNumber } from "./validators";

export class CardValidationWidget {
  constructor(parentEl, callback) {
    this.parentEl = parentEl;
    this.paySystemElements = null;
    this.callback = callback;
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
    this.paySystemElements = Array.from(
      this.element.querySelectorAll(".pay-system")
    );

    this.element.addEventListener("submit", this.onSubmit);
  }

  enableCardBadge(paySystem) {
    const activeBadgeEl = this.parentEl.querySelector("." + paySystem);
    if (activeBadgeEl) {
      this.paySystemElements.forEach((el) => {
        if (!el.classList.contains("disabled")) {
          el.classList.add("disabled");
        }
      });
      activeBadgeEl.classList.remove("disabled");
    } else {
      this.paySystemElements.forEach((el) => {
        if (el.classList.contains("disabled")) {
          el.classList.remove("disabled");
        }
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const value = this.input.value;
    const result = isValidCardNumber(value);
    this.enableCardBadge(result.paySystem);
    this.callback(result);
  }
}
