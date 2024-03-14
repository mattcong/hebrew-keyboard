export const insertCharAtCursor = (inputElement, char) => {
  const { selectionStart, selectionEnd } = inputElement

  const textBefore = inputElement.value.substring(0, selectionStart)
  const textAfter = inputElement.value.substring(selectionEnd)

  inputElement.value = textBefore + char + textAfter
  const newPos = selectionStart + char.length
  inputElement.setSelectionRange(newPos, newPos)
  inputElement.focus()
}

export const applyBackspace = (inputElement) => {
  const { value, selectionStart, selectionEnd } = inputElement

  // handle highlighted text
  if (selectionStart === selectionEnd) {
    inputElement.value = value.substring(0, selectionStart - 1) + value.substring(selectionStart)
    inputElement.setSelectionRange(selectionStart - 1, selectionStart - 1)
  } else {
    inputElement.value = value.substring(0, selectionStart) + value.substring(selectionEnd)
    inputElement.setSelectionRange(selectionStart, selectionStart)
  }
  inputElement.focus()
}
