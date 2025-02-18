import { inputFieldMap } from "./constants.js";
import inputValidation from "./validation.js";
const setErrorListener = function () {
    inputFieldMap.forEach((_, fieldId) => {
        // getting label and input field
        const inputField = document.getElementById(fieldId);
        const label = inputField.parentElement;
        if (!inputField || !label)
            return;
        // inputField.oninput = (e) => {
        //     updateSubmitBtn();
        // }
        inputField.addEventListener('focusin', (e) => {
            inputField.className = 'invalid';
            updateErrorElement(label, '');
        });
        inputField.addEventListener('focusout', (e) => {
            const errorMsg = inputValidation(inputField.id, inputField.value);
            inputField.className = (!!errorMsg) ? 'invalid' : 'valid';
            updateErrorElement(label, errorMsg);
            updateSubmitBtn();
        });
    });
};
const updateErrorElement = (label, errorMsg) => {
    const errorElem = label.querySelector(".errorMsg");
    if (!errorElem)
        return;
    errorElem.textContent = errorMsg !== null && errorMsg !== void 0 ? errorMsg : '';
};
const updateSubmitBtn = () => {
    const submitBtn = document.getElementById('submit');
    let isSubmitButDisabled = false;
    inputFieldMap.forEach((_, fieldId) => {
        const input = document.getElementById(fieldId);
        // if (input.className !== 'valid') {
        if (input.className === 'invalid') {
            console.log("hahaha");
            isSubmitButDisabled = true;
        }
    });
    submitBtn.disabled = isSubmitButDisabled;
    console.log(submitBtn.disabled);
};
export default setErrorListener;
