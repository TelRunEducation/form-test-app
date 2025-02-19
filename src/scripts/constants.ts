export const minNameLength = 3;
export const maxNameLength = 20;

export const inputFields = new Array<string>(
  'first-name',
  'last-name',
  'email',
  'birthdate',
  'password',
  'confirm-password')

export const nameLengthErrorMsg = `should contain from ${minNameLength} to ${maxNameLength} characters.`
export const nameInvalidCharInputErrorMsg = 'must contain letters and hyphen/space for double names'
export const wrongDateFormatErrorMsg = 'Incorrect date format'
export const futureDateInputErrorMsg = 'Future date'
export const notAdultErrorMsg = 'You are not an adult'
export const wrongEmailFormatErrorMsg = 'Email address is invalid'