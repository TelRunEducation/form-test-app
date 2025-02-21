export type InputErrorMsg = string | null | undefined

export type CheckInput = (string, string?) => InputErrorMsg
export interface InputElements {
  input: HTMLInputElement,
  errorSpan: HTMLSpanElement
}