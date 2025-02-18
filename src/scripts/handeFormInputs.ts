import {inputFields} from "./constants.js";
import inputValidation from "./inputValidation.js";
import {InputErrorMsg} from "./types";

const submitBtn = document.getElementById('submit') as HTMLInputElement

const setErrorListener = function () {
  inputFields.forEach((fieldId) => {
    // getting label and input field
    const inputField: HTMLInputElement = document.getElementById(fieldId) as HTMLInputElement;
    const label: HTMLLabelElement = inputField.parentElement as HTMLLabelElement

    inputField.addEventListener('focusin', (e) => {
      inputField.className = ''
      updateErrorElement(label, '')
    })

    inputField.addEventListener('focusout', (e) => {
      const errorMsg = inputValidation(inputField.id, inputField.value)
      inputField.className = (!!errorMsg) ? 'invalid' : 'valid'
      updateErrorElement(label, errorMsg)
      updateSubmitBtn();
    })
  })
}

const updateErrorElement = (
  label: HTMLLabelElement,
  errorMsg: InputErrorMsg
) => {
  const errorElem = label.querySelector(".errorMsg") as HTMLSpanElement;
  if (!errorElem) return
  errorElem.textContent = errorMsg ?? '';
}

const updateSubmitBtn = () => {
  let isSubmitButDisabled = false;
  inputFields.forEach(
    (fieldId) => {
      const input: HTMLInputElement = document.getElementById(fieldId) as HTMLInputElement
      // all fields must have 'valid' class
      if (input.className !== 'valid') {
        isSubmitButDisabled = true
      }
    })
  submitBtn.disabled = isSubmitButDisabled
}

export default setErrorListener;
