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
  const result = { success: true, errorMessage: "", paySystem: "xxx" };
  const numberLength = cardNumber.length;
  const notValidLength = "не правильная длина номера карты";

  // номер карты должен состоять только из цифр
  if (!/^\d+$/.test(cardNumber)) {
    result.success = false;
    result.errorMessage = "в номере карты должны быть только цифры";
    return result;
  }

  // проверяем номер карты по алгоритму Luhn
  if (!isValidLuhn(cardNumber)) {
    result.success = false;
    result.errorMessage = "не прошла проверка по алгоритму Luhn";
    return result;
  }

  const innRangeStart2 = parseInt(cardNumber.slice(0, 2));
  const innRangeStart3 = parseInt(cardNumber.slice(0, 3));
  const innRangeStart4 = parseInt(cardNumber.slice(0, 4));
  const innRangeStart6 = parseInt(cardNumber.slice(0, 6));

  // определяем платежную систему и проверяем длину номера карты

  // Visa
  if (cardNumber[0] === "4") {
    result.paySystem = "visa";
    if (![13, 16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = notValidLength;
    }
    return result;
  }

  // MasterCard
  if (
    (innRangeStart6 >= 222100 && innRangeStart6 <= 272099) ||
    (innRangeStart2 >= 51 && innRangeStart2 <= 55)
  ) {
    result.paySystem = "mastercard";
    if (numberLength !== 16) {
      result.success = false;
      result.errorMessage = notValidLength;
    }
    return result;
  }

  // American Express
  if ([34, 37].includes(innRangeStart2)) {
    result.paySystem = "americanexpress";
    if (numberLength !== 15) {
      result.success = false;
      result.errorMessage = notValidLength;
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
    result.paySystem = "discover";
    if (![16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = notValidLength;
    }
    return result;
  }

  // JCB
  if (innRangeStart4 >= 3528 && innRangeStart4 <= 3589) {
    result.paySystem = "jcb";
    if (![16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = notValidLength;
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
    result.paySystem = "diners";
    if (![14, 16].includes(numberLength)) {
      result.success = false;
      result.errorMessage = notValidLength;
    }
    return result;
  }

  // MIR
  if (innRangeStart4 >= 2200 && innRangeStart4 <= 2204) {
    result.paySystem = "mir";
    if (![16, 19].includes(numberLength)) {
      result.success = false;
      result.errorMessage = notValidLength;
    }
    return result;
  }

  result.success = false;
  result.errorMessage = "не определена платежная система";
  return result;
}
