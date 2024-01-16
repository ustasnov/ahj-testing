export function isValidInn(value) {
  return value.length >= 10 && value.length <= 12;
}

function isValidLuhn(cardNumber) {
  const checksum = parseInt(cardNumber[cardNumber.length - 1]);
  let total = 0;

  for (let i = cardNumber.length - 2; i >= 0; i -= 1) {
    let digit = parseInt(cardNumber[i]);
    if (i % 2 === 0) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    total += digit;
  }

  return 10 - (total % 10) === checksum;
}

export function isValidCardNumber(cardNumber) {
  const result = { success: true, errorMessage: "", paySystem: "" };
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

  return result;
}
