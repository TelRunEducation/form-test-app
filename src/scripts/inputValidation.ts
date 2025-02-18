import {CheckInput, InputErrorMsg} from "./types";
import {
  futureDateInputErrorMsg,
  inputFields,
  maxNameLength,
  minNameLength,
  nameInvalidCharInputErrorMsg,
  nameLengthErrorMsg,
  notAdultErrorMsg,
  wrongDateFormatErrorMsg
} from "./constants.js";

const inputValidation = (
  fieldId: string,
  fieldValue: string | null
): InputErrorMsg => {
  // if by any mistake we're trying to check some other field but from inputFieldMap list
  if (!inputFields.find(id => id === fieldId)) {
    console.warn(fieldId, ': Wrong input check request');
    return null
  }
  console.log(fieldId + ": " + fieldValue);
  switch (fieldId) {
    case 'first-name': {
      return createErrorMessage(checkName(fieldValue), 'First name');
    }
    case 'last-name': {
      return createErrorMessage(checkName(fieldValue), 'Last name');
    }
    case 'birthdate': {
      checkBirthDate(fieldValue)
    }
  }
  return null;
}

const checkName: CheckInput = (value: string) => {
  const nameInput = value.trim()

  if (nameInput.length < minNameLength || nameInput.length > maxNameLength) {
    return nameLengthErrorMsg;
  }
  // check that name contains only correct symbols
  if (!/^[A-Z]+(-)?( )?[A-Z]+$/i.test(nameInput)) {
    return nameInvalidCharInputErrorMsg;
  }
  return null;
}

const checkBirthDate: CheckInput = (dateStr: string) => {
  const dateInMls = Date.parse(dateStr);
  if (isNaN(dateInMls)) {
    return wrongDateFormatErrorMsg;
  }
  if (dateInMls > Date.now()) {
    return futureDateInputErrorMsg
  }
  const dateUnderCheck = new Date(dateInMls)
  const currentYear = new Date().getFullYear();
  let age: number = currentYear - dateUnderCheck.getFullYear()
  dateUnderCheck.setFullYear(currentYear)
  if (dateUnderCheck.valueOf() > Date.now()) {
    age -=1;
  }
  if (age < 18) {
    return notAdultErrorMsg;
  }
  return null
}

const createErrorMessage = (errorMsg: InputErrorMsg, fieldName: string): InputErrorMsg => {
  return (!errorMsg) ? null : `${fieldName} ${errorMsg}`
}

export default inputValidation

