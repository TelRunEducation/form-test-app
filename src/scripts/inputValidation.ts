import {CheckInput, InputErrorMsg} from "./types.js";
import {
  futureDateInputErrorMsg,
  inputFields,
  maxNameLength,
  minNameLength,
  nameInvalidCharInputErrorMsg,
  nameLengthErrorMsg,
  notAdultErrorMsg,
  wrongDateFormatErrorMsg, wrongEmailFormatErrorMsg
} from "./constants.js";

const inputValidation = (
  fieldId: string,
  fieldValue: string | null,
  additionalFieldValue? : string | null
): InputErrorMsg => {
  // if by any mistake we're trying to check some other field but from inputFieldMap list
  if (!inputFields.find(id => id === fieldId)) {
    console.warn(fieldId, ': Wrong input check request');
    return null
  }
  switch (fieldId) {
    case 'first-name': {
      return createErrorMessage(checkName(fieldValue), 'First name')
    }
    case 'last-name': {
      return createErrorMessage(checkName(fieldValue), 'Last name')
    }
    case 'birthdate': {
      return checkBirthDate(fieldValue)
    }
    case 'email' : {
      return checkEmail(fieldValue)
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
  // check format
  if (isNaN(dateInMls)) {
    return wrongDateFormatErrorMsg;
  }
  // check that the date is from the past
  if (dateInMls > Date.now()) {
    return futureDateInputErrorMsg
  }
  // check age
  const dateUnderCheck = new Date(dateInMls)
  const currentYear = new Date().getFullYear();
  let age: number = currentYear - dateUnderCheck.getFullYear()
  dateUnderCheck.setFullYear(currentYear)
  if (dateUnderCheck.valueOf() > Date.now()) {
    age -= 1;
  }
  if (age < 18) {
    return notAdultErrorMsg;
  }
  return null
}

const checkEmail: CheckInput = (value: string) => {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
    return wrongEmailFormatErrorMsg;
  }
  return null
}

const createErrorMessage = (errorMsg: InputErrorMsg, fieldName: string): InputErrorMsg => {
  return (!errorMsg) ? null : `${fieldName} ${errorMsg}`
}

export default inputValidation

