import {CheckInput, InputErrorMsg} from "./types";
import {
  futureDateInputErrorMsg,
  inputFieldMap,
  maxNameLength,
  minNameLength,
  nameInvalidCharInputErrorMsg,
  nameLengthErrorMsg, wrongDateFormatErrorMsg
} from "./constants.js";

const inputValidation = (fieldId: string, fieldValue: string | null): InputErrorMsg => {
  let error: InputErrorMsg = null

  // if by any mistake we're trying to check some other field but from inputFieldMap list
  let fieldName = inputFieldMap.get(fieldId);
  if (!fieldName) {
    console.warn(fieldId, ': Wrong input check request');
    return error
  }
  switch (fieldId) {
    case 'first-name': {
      error = createErrorMessage(fieldName, checkName(fieldValue))
      break;
    }
    case 'last-name': {
      error = createErrorMessage(fieldName, checkName(fieldValue))
      break;
    }
    case 'birthdate': {
      error = checkBirthDate(fieldValue)
      break;
    }
  }
  return error
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
  const dateInMls  = Date.parse(dateStr);
  if (isNaN(dateInMls)) {
    return wrongDateFormatErrorMsg;
  }
  const dateUnderCheck = new Date(dateInMls)
  if (dateInMls > Date.now()) {
    return futureDateInputErrorMsg
  }
  return null
}

const createErrorMessage = (
  fieldName: string, errorMsg: InputErrorMsg
): InputErrorMsg => (!errorMsg) ? null : `${fieldName} ${errorMsg}`


export default inputValidation

