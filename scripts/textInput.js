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

  const chars = Array.from(value)

  const charStartIndex = Array.from(value.slice(0, selectionStart)).length
  const charEndIndex = Array.from(value.slice(0, selectionEnd)).length

  // handle highlighted text
  if (charStartIndex === charEndIndex) {
    if (charStartIndex > 0) {
      const deletionIndex = charStartIndex - 1
      chars.splice(deletionIndex, 1)

      const newValue = chars.join("")
      inputElement.value = newValue

      const newSelectionStart = Array.from(newValue).slice(0, deletionIndex).join("").length
      inputElement.setSelectionRange(newSelectionStart, newSelectionStart)
    }
  } else {
    chars.splice(charStartIndex, charEndIndex - charStartIndex)

    const newValue = chars.join("")
    inputElement.value = newValue

    const newSelectionStart = Array.from(newValue).slice(0, charStartIndex).join("").length
    inputElement.setSelectionRange(newSelectionStart, newSelectionStart)
  }
  inputElement.focus()
}
