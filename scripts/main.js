import { standardFlatLayout } from "../layouts/standardFlat.js"
import { standardLayout } from "../layouts/standard.js"
import { paleoLayout } from "../layouts/paleo.js"
import { aramaicLayout } from "../layouts/aramaic.js"
import { insertCharAtCursor, applyBackspace } from "./utils.js"

const vowelWrap = document.getElementById("vowel-wrap")
const consonantWrap = document.getElementById("consonant-wrap")
const textInput = document.getElementById("input")

let isShiftEnabled = false
let currentLayout = "A"
const keyCodeToChar = {}

const renderLayout = (layout, element) => {
  layout.forEach((key) => {
    const isBlank = key.letter === "blank"
    const isFinalForm = isShiftEnabled && key.finalForm

    const button = document.createElement("button")
    button.className = "key"
    button.setAttribute("title", isBlank ? "" : key.title)
    button.setAttribute("data-char", isBlank ? "" : isFinalForm ? key.finalForm : key.letter)
    button.setAttribute("data-key", key.dataKey)

    const letterChar = document.createElement("span")
    letterChar.className = "letter"
    letterChar.textContent = isBlank ? "" : isFinalForm ? key.finalForm : key.letter

    const qwertyChar = document.createElement("span")
    qwertyChar.className = "qwerty"
    qwertyChar.textContent = key.qwertyLetter

    const finalFormChar = document.createElement("span")
    finalFormChar.className = "final-form"
    finalFormChar.textContent = isBlank ? "" : isFinalForm ? key.letter : key.finalForm

    button.appendChild(letterChar)
    button.appendChild(qwertyChar)
    button.appendChild(finalFormChar)

    element.appendChild(button)
  })

  const keys = document.querySelectorAll(".key")

  keys.forEach((key) => {
    const dataKey = key.getAttribute("data-key")
    const dataChar = key.getAttribute("data-char")
    const isPresent = typeof dataKey === "string" && typeof dataChar === "string"
    if (isPresent) {
      keyCodeToChar[dataKey] = dataChar
    }
  })
}

const clearLayout = () => {
  while (consonantWrap.firstChild) {
    consonantWrap.removeChild(consonantWrap.firstChild)
  }
}

const resetShift = () => {
  isShiftEnabled = false
  shiftSymbol.setAttribute("style", "fill: none")
}

const toggleShift = () => {
  if (currentLayout === "A") {
    isShiftEnabled = !isShiftEnabled

    if (isShiftEnabled) {
      shiftSymbol.setAttribute("style", "fill: #0e0e0e")
    } else {
      shiftSymbol.setAttribute("style", "fill: none")
    }

    clearLayout()
    renderLayout(standardLayout.consonants, consonantWrap)
  }
}

renderLayout(standardLayout.vowels, vowelWrap)
renderLayout(standardLayout.consonants, consonantWrap)

document.getElementById("keyboard").addEventListener("click", (event) => {
  if (event.target.classList.contains("key")) {
    const char = event.target.getAttribute("data-char")
    if (char) {
      insertCharAtCursor(textInput, char)
    } else if (event.target.id === "backspaceKey") {
      applyBackspace(textInput)
    } else if (event.target.id === "shiftKey") {
      toggleShift()
    }
  }
})

const layoutAKey = document.getElementById("layoutA")
const layoutBKey = document.getElementById("layoutB")
const layoutCKey = document.getElementById("layoutC")
const layoutDKey = document.getElementById("layoutD")

layoutAKey.addEventListener("click", function () {
  currentLayout = "A"
  layoutAKey.className = "layout-button layout-button--active"
  layoutBKey.className = "layout-button"
  layoutCKey.className = "layout-button"
  layoutDKey.className = "layout-button"
  clearLayout()
  resetShift()
  renderLayout(standardLayout.consonants, consonantWrap)
})
layoutBKey.addEventListener("click", function () {
  currentLayout = "B"
  layoutBKey.className = "layout-button layout-button--active"
  layoutAKey.className = "layout-button"
  layoutCKey.className = "layout-button"
  layoutDKey.className = "layout-button"
  clearLayout()
  resetShift()
  renderLayout(standardFlatLayout.consonants, consonantWrap)
})
layoutCKey.addEventListener("click", function () {
  currentLayout = "C"
  layoutCKey.className = "layout-button layout-button--active"
  layoutAKey.className = "layout-button"
  layoutBKey.className = "layout-button"
  layoutDKey.className = "layout-button"
  clearLayout()
  resetShift()
  renderLayout(paleoLayout.consonants, consonantWrap)
})
layoutDKey.addEventListener("click", function () {
  currentLayout = "D"
  layoutDKey.className = "layout-button layout-button--active"
  layoutAKey.className = "layout-button"
  layoutBKey.className = "layout-button"
  layoutCKey.className = "layout-button"
  clearLayout()
  resetShift()
  renderLayout(aramaicLayout.consonants, consonantWrap)
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
  } else if (event.code === "ShiftLeft") {
    toggleShift()
  }
})

document.addEventListener("keyup", function (event) {
  const keyElement = document.querySelector(`.key[data-key="${event.code}"]`)
  keyElement?.classList.remove("pressed")
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
