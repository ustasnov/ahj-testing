import { CardValidationWidget } from "../widget";

test("widget should render", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new CardValidationWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(CardValidationWidget.markup);
});

test("widget should validate card number with success result", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new CardValidationWidget(container);

  widget.bindToDOM();

  widget.input.value = "4111111111111111";
  widget.submit.click();

  widget.input.value = "4111111111111111";
  widget.submit.click();

  const activeBadgeEl = widget.parentEl.querySelector(
    "." + widget.result.paySystem
  );

  expect(activeBadgeEl.classList.contains("visa")).toBe(true);
});

test("widget should validate card number with not success result", () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new CardValidationWidget(container);

  widget.bindToDOM();

  widget.input.value = "4111111111111111";
  widget.submit.click();

  widget.input.value = "4111111111111112";
  widget.submit.click();

  const activeBadgeEl = widget.parentEl.querySelector(
    "." + widget.result.paySystem
  );

  expect(activeBadgeEl).toBe(null);
});

test("widget must execute a callback", () => {
  let r = false;

  const callback = (res) => {
    r = res.success;
  };

  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new CardValidationWidget(container, callback);

  widget.bindToDOM();

  widget.input.value = "4111111111111111";
  widget.submit.click();

  expect(r).toBe(true);
});
