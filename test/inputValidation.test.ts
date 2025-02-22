import inputValidation from '../src/scripts/inputValidation';
import {nameLengthErrorMsg, wrongEmailFormatErrorMsg} from "../src/scripts/constants";

test('verify first-name: value = "Nadia" is valid', () => {
  expect(inputValidation('first-name', 'Nadia')).toBeNull();
});

test('verify first-name: value = "Na" returns min first name length error', () => {
  expect(inputValidation('first-name', 'Na')).toBe("First name " + nameLengthErrorMsg);
});

test('verify first-name: value = "Anna-Maria" is valid', () => {
  expect(inputValidation('first-name', 'Anna-Maria')).toBeNull();
});

test('verify email: value = "test@mail.con" is valid', () => {
  expect(inputValidation('email', 'test@mail.con')).toBeNull();
});

test('verify email: value = "testmail.con" is valid', () => {
  expect(inputValidation('email', 'testmail.con')).toBe(wrongEmailFormatErrorMsg);
});

