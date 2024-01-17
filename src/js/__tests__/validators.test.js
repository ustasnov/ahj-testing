import { isValidInn, isValidCardNumber } from "../validators";

test("should be false if inn length less then 10", () => {
  const result = isValidInn("");

  expect(result).toBe(false);
});

test("should be false if inn length more then 10", () => {
  const result = isValidInn("fdfasdfsadadfasdfasdfasdfadfa");

  expect(result).toBe(false);
});

test("should be false if inn length is 10", () => {
  const result = isValidInn("1234567890");

  expect(result).toBe(true);
});

test("should be true if card number include only digits", () => {
  const result = isValidCardNumber("4111111111111111");

  expect(result.success).toBe(true);
});

test("should be false if card number not include only digits", () => {
  const result = isValidCardNumber("!,6рол789ghjhg1234");

  expect(result.success).toBe(false);
});

test("should be valid card number", () => {
  const result = isValidCardNumber("4111111111111111");

  expect(result.success).toBe(true);
});

test("should be invalid card number", () => {
  const result = isValidCardNumber("4111111111111112");

  expect(result.success).toBe(false);
});

test.each([
  ["4111111111111111", "Visa"],
  ["5555555555554444", "MasterCard"],
  ["371449635398431", "American Express"],
  ["6011111111111117", "Discover"],
  ["3530111333300000", "JCB"],
  ["30569309025904", "Diners Club"],
  ["2201144495995333", "MIR"],
])(
  "%s: cards number must be valid, and from pay system %s",
  (cardNumber, paySystem) => {
    const destObject = { sc: true, ps: paySystem };
    const validationResult = isValidCardNumber(cardNumber);
    const sourceObject = {
      sc: validationResult.success,
      ps: validationResult.paySystem,
    };

    expect(sourceObject).toEqual(destObject);
  }
);

test.each([
  ["411111111117", "Visa"],
  ["5555555555554", "MasterCard"],
  ["3714496353981", "American Express"],
  ["6011111111119", "Discover"],
  ["3530111333301", "JCB"],
  ["3056930902597", "Diners Club"],
  ["2201144495993", "MIR"],
])(
  "should %s: cards number has invalid card number length for pay system %s",
  (cardNumber, paySystem) => {
    const destObject = { sc: false, ps: paySystem };
    const validationResult = isValidCardNumber(cardNumber);
    const sourceObject = {
      sc: validationResult.success,
      ps: validationResult.paySystem,
    };

    expect(sourceObject).toEqual(destObject);
  }
);

test("should card pay system is not defined", () => {
  const result = isValidCardNumber("9156765567823456");

  expect(result.success).toBe(false);
});
