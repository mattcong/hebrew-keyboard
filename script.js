const textInput = document.getElementById("input")
const keyboard = document.getElementById("keyboard")
const keys = document.querySelectorAll(".key")

const keyCodeToChar = {}
keys.forEach((key) => {
  const dataKey = key.getAttribute("data-key")
  const dataChar = key.getAttribute("data-char")
  if (dataKey && dataChar) {
    keyCodeToChar[dataKey] = dataChar
  }
})

document.getElementById("keyboard").addEventListener("click", (event) => {
  if (event.target.classList.contains("key")) {
    const char = event.target.getAttribute("data-char")
    if (char) {
      insertCharAtCursor(textInput, char)
    } else if (event.target.id === "backspaceKey") {
      applyBackspace(textInput)
    }
  }
})

document.addEventListener("keydown", (event) => {
  const keyElement = document.querySelector(`.key[data-key="${event.code}"]`)
  keyElement.classList.add("pressed")

  if (keyCodeToChar[event.code]) {
    event.preventDefault()
    insertCharAtCursor(textInput, keyCodeToChar[event.code])
  } else if (event.code === "Backspace") {
    event.preventDefault()
    applyBackspace(textInput)
  }
})

let lastTap = 0

document.addEventListener("touchstart", function (event) {
  const currentTime = new Date().getTime()
  const tapLength = currentTime - lastTap
  if (tapLength < 300 && tapLength > 0) {
    event.preventDefault()
  }
  lastTap = currentTime
})

document.addEventListener("keyup", function (event) {
  const keyElement = document.querySelector(`.key[data-key="${event.code}"]`)
  keyElement.classList.remove("pressed")
})

function insertCharAtCursor(inputElement, char) {
  const { selectionStart, selectionEnd } = inputElement

  const textBefore = inputElement.value.substring(0, selectionStart)
  const textAfter = inputElement.value.substring(selectionEnd)

  inputElement.value = textBefore + char + textAfter
  const newPos = selectionStart + char.length
  inputElement.setSelectionRange(newPos, newPos)
  inputElement.focus()
}

function applyBackspace(inputElement) {
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
