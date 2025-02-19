import {inputFields} from "./constants.js";
import inputValidation from "./inputValidation.js";
import {InputErrorMsg} from "./types";

export const setErrorListener = function () {
  inputFields.forEach((fieldId) => {
    const inputField: HTMLInputElement = document.getElementById(fieldId) as HTMLInputElement;
    const label: HTMLLabelElement = inputField.parentElement as HTMLLabelElement
    const errorText = label.querySelector(".errorMsg") as HTMLSpanElement;

    inputField.addEventListener('focusin',
      () => updateInputState(inputField, errorText, false))

    inputField.addEventListener('focusout',
      () => updateInputState(inputField, errorText, true))

    inputField.oninput = () => {
      // check for input error and put them to error text
      const errorMsg = inputValidation(
        inputField.id,
        inputField.value,
        getAdditionalInputValue(inputField.id)
      )
      updateErrorText(errorText, errorMsg)
      updateSubmitBtn()
    }
  })
}
/**
 *  Disables or enables submit button state according to user input and if all the inputs were filled.
 */
const updateSubmitBtn = () => {
  const submitBtn = document.getElementById('submit') as HTMLInputElement
  let isSubmitButDisabled = false;
  inputFields.forEach(
    (fieldId: string) => {
      const inputField: HTMLInputElement = document.getElementById(fieldId) as HTMLInputElement;
      const label: HTMLLabelElement = inputField.parentElement as HTMLLabelElement
      const errorText = label.querySelector(".errorMsg") as HTMLSpanElement;
      // if input field has errors in it or haven't been checked yet, so className = ''
      if (!!errorText.textContent || inputField.className === '') {
        isSubmitButDisabled = true
      }
    })
  submitBtn.disabled = isSubmitButDisabled
}

/**
 *
 * @param inputField the input field that was checkec
 * @param errorText the span that contains error text
 * @param errorMode true if the field is out of focus, false if the field is being updated
 */
const updateInputState = (
  inputField: HTMLInputElement,
  errorText: HTMLSpanElement,
  errorMode: boolean
) => {
  const hasError = !!errorText.textContent
  const showError = errorMode && hasError

  errorText.style.visibility = showError ? 'visible' : 'hidden';
  if (!hasError) {
    inputField.className = 'valid'
  } else {
    inputField.className = errorMode ? 'invalid' : '' //
  }
}

const getAdditionalInputValue = (fieldId: string) =>
  fieldId === 'confirm-password'
    ? (document.getElementById('password') as HTMLInputElement).value
    : null

const updateErrorText = (
  errorText: HTMLSpanElement,
  errorMsg: InputErrorMsg
) => errorText.textContent = errorMsg ?? '';
