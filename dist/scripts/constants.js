export const minNameLength = 3;
export const maxNameLength = 20;
export const inputFieldMap = new Map([
    ['first-name', 'First name'],
    ['last-name', 'Last name'],
    ['email', 'Email'],
    ['birthdate', 'Birthdate'],
    ['password', 'Password'],
    ['confirm-password', 'Confirm password']
]);
export const nameLengthErrorMsg = `should contain from ${minNameLength} to ${maxNameLength} characters.`;
export const nameInvalidCharInputErrorMsg = 'must contain letters and hyphen/space for double names';
export const wrongDateFormatErrorMsg = 'Incorrect date format';
export const futureDateInputErrorMsg = 'Future date';
