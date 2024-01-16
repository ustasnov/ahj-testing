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

test("should be true if cardNumber include only digits", () => {
  //const result = isValidCardNumber('4111111111111111');
  //const result = isValidCardNumber('4556737586899855');
  const result = isValidCardNumber("4274274404160402");
  if (!result.success) {
    console.log(result.errorMessage);
  }

  expect(result.success).toBe(true);
  //expect(result.success).toBe(false);
});

test("should be false if cardNumber not include only digits", () => {
  const result = isValidCardNumber("!,6рол789ghjhg1234");
  if (!result.success) {
    console.log(result.errorMessage);
  }

  expect(result.success).toBe(false);
});

test("should be valid cardNumber", () => {
  //const result = isValidCardNumber('4111111111111111');
  //const result = isValidCardNumber('4556737586899855');
  const result = isValidCardNumber("4274274404160402");
  if (!result.success) {
    console.log(result.errorMessage);
  }

  expect(result.success).toBe(true);
  //expect(result.success).toBe(false);
});

test("should be invalid cardNumber", () => {
  const result = isValidCardNumber("4111111111111112");
  if (!result.success) {
    console.log(result.errorMessage);
  }

  expect(result.success).toBe(false);
});
