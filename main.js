import { standardLayout } from "./standardLayout.js"
import { insertCharAtCursor, applyBackspace } from "./utils.js"

const vowelWrap = document.getElementById("vowel-wrap")
const consonantWrap = document.getElementById("consonant-wrap")

function renderLayout(layout, element) {
  layout.forEach((key) => {
    const button = document.createElement("button")
    button.className = "key"
    button.setAttribute("title", key.title)
    button.setAttribute("data-char", key.dataChar)
    button.setAttribute("data-key", key.dataKey)

    const letterChar = document.createElement("span")
    letterChar.className = "letter"
    letterChar.textContent = key.letter

    const qwertyChar = document.createElement("span")
    qwertyChar.className = "qwerty"
    qwertyChar.textContent = key.qwertyLetter

    button.appendChild(letterChar)
    button.appendChild(qwertyChar)

    element.appendChild(button)
  })
}

renderLayout(standardLayout.vowels, vowelWrap)
renderLayout(standardLayout.consonants, consonantWrap)

const textInput = document.getElementById("input")
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
