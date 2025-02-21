import {inputFields} from "./constants.js";
import inputValidation from "./inputValidation.js";
import {InputElements, InputErrorMsg} from "./types";

export const setErrorListener = function () {
  inputFields.forEach((fieldId) => {
    const elements = getInputElements(fieldId)

    elements.input.addEventListener('focusin',
      () => updateInputState(elements.input, elements.errorSpan, false))

    elements.input.addEventListener('focusout',
      () => updateInputState(elements.input, elements.errorSpan, true))

    elements.input.oninput = () => {
      // check for input error and put them to error text
      let additionalValue;
      // in case of password and confirm password
      const additionalInputId = getAdditionalInputId(fieldId);

      if (!!additionalInputId) {
        const additionalElems = getInputElements(additionalInputId)
        if (fieldId === 'confirm-password') {
          additionalValue = additionalElems.input.value // password value to compare
        }
        if (fieldId === 'password') {
          // if password is changing we check also confirm-password and show the error
          checkErrorAndUpdateInputElements(
            additionalInputId,
            additionalElems.input.value,
            additionalElems.errorSpan,
            elements.input.value,
          )
          updateInputState(additionalElems.input, additionalElems.errorSpan, true)
        }
      }
      // now we check the main field
      checkErrorAndUpdateInputElements(
        fieldId,
        elements.input.value,
        elements.errorSpan,
        additionalValue,
      )
      updateSubmitBtn()
    }
  })
}

const checkErrorAndUpdateInputElements = (
  fieldId: string,
  value: string,
  errorSpan: HTMLSpanElement,
  additionalValue?: string,
) => {
  const errorMsg = inputValidation(
    fieldId,
    value,
    additionalValue
  )
  updateErrorText(errorSpan, errorMsg)
}

/**
 *  Disables or enables submit button state according to user input and if all the inputs were filled.
 */
const updateSubmitBtn = () => {
  const submitBtn = document.getElementById('submit') as HTMLInputElement
  let isSubmitButDisabled = false;
  inputFields.forEach(
    (fieldId: string) => {
      const elements = getInputElements(fieldId)
      // if input field has errors in it or haven't been checked yet, so className = ''
      if (!!elements.errorSpan.textContent || elements.input.className === '') {
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
    inputField.className = errorMode ? 'invalid' : ''
  }
}

const getAdditionalInputId = (fieldId: string) => {
  let additionalFieldId
  if (fieldId === 'password') additionalFieldId = 'confirm-password'
  if (fieldId === 'confirm-password') additionalFieldId = 'password'
  return additionalFieldId
}


const updateErrorText = (
  errorText: HTMLSpanElement,
  errorMsg: InputErrorMsg
) => errorText.textContent = errorMsg ?? '';

const getInputElements: (id: string) => InputElements = (id) => {
  const inputField: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
  const label: HTMLLabelElement = inputField.parentElement as HTMLLabelElement
  const errorText = label.querySelector(".errorMsg") as HTMLSpanElement;
  return {input: inputField, errorSpan: errorText}
}
