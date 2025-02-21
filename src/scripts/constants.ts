export const minNameLength = 3;
export const maxNameLength = 20;
export const minPasswordLength = 8;

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
export const passwordMinLengthErrorMsg = `Password must be at least ${minPasswordLength} characters.`
export const wrongPasswordFormatErrorMsg = 'Password must contain at least one digit, one capital letter and one special character.'
export const confirmPasswordErrorMsg = 'Password and confirm password are not equal'