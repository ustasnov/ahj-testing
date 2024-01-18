function isValidLuhn(value) {
  let nCheck = 0,
    bEven = false;
  //value = value.replace(/\D/g, "");

  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) {
      nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }
  return nCheck % 10 == 0;
}

export function isValidCardNumber(cardNumber) {
  const result = { success: true, errorMessage: "", paySystem: "" };
  const numberLength = cardNumber.length;

  // номер карты должен состоять только из цифр
  if (!/^\d+$/.test(cardNumber)) {
    result.success = false;
    result.errorMessage = "The card number must consist of digits only";
    return result;
  }
  // проверяем номер карты по алгоритму Luhn
  if (!isValidLuhn(cardNumber)) {
    result.success = false;
    result.errorMessage = "Not valid card number";
    return result;
  }

  const innRangeStart2 = parseInt(cardNumber.slice(0, 2));
  const innRangeStart3 = parseInt(cardNumber.slice(0, 3));
  const innRangeStart4 = parseInt(cardNumber.slice(0, 4));
  const innRangeStart6 = parseInt(cardNumber.slice(0, 6));

  // определяем платежную систему и проверяем длину номера карты

  // Visa
  if (cardNumber[0] === "4") {
    result.paySystem = "Visa";
    if (![13, 16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = "Invalid card number length";
    }
    return result;
  }

  // MasterCard
  if (
    (innRangeStart6 >= 222100 && innRangeStart6 <= 272099) ||
    (innRangeStart2 >= 51 && innRangeStart2 <= 55)
  ) {
    result.paySystem = "MasterCard";
    if (numberLength !== 16) {
      result.success = false;
      result.errorMessage = "Invalid card number length";
    }
    return result;
  }

  // American Express
  if ([34, 37].includes(innRangeStart2)) {
    result.paySystem = "American Express";
    if (numberLength !== 15) {
      result.success = false;
      result.errorMessage = "Invalid card number length";
    }
    return result;
  }

  // Discover
  if (
    innRangeStart4 === 6011 ||
    innRangeStart2 === 65 ||
    (innRangeStart3 >= 644 && innRangeStart3 <= 649) ||
    (innRangeStart6 >= 622126 && innRangeStart6 <= 622925)
  ) {
    result.paySystem = "Discover";
    if (![16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = "Invalid card number length";
    }
    return result;
  }

  // JCB
  if (innRangeStart4 >= 3528 && innRangeStart4 <= 3589) {
    result.paySystem = "JCB";
    if (![16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = "Invalid card number length";
    }
    return result;
  }

  // Diners Club
  if (
    (innRangeStart4 >= 3000 && innRangeStart4 <= 3059) ||
    innRangeStart4 === 3095 ||
    innRangeStart2 === 36 ||
    innRangeStart2 === 38
  ) {
    result.paySystem = "Diners Club";
    if (![14, 16].includes(numberLength)) {
      result.success = false;
      result.errorMessage = "Invalid card number length";
    }
    return result;
  }

  // MIR
  if (innRangeStart4 >= 2200 && innRangeStart4 <= 2204) {
    result.paySystem = "MIR";
    if (![16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = "Invalid card number length";
    }
    return result;
  }

  result.success = false;
  result.errorMessage = "Payment system is not defined";
  return result;
}
