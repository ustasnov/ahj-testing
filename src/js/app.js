import { CardValidationWidget } from "./widget";

const container = document.querySelector(".container");
const form = new CardValidationWidget(container);

form.bindToDOM();
