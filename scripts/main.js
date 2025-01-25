import { standardFlatLayout } from "../layouts/standardFlat.js"
import { standardLayout } from "../layouts/standard.js"
import { paleoLayout } from "../layouts/paleo.js"
import { aramaicLayout } from "../layouts/aramaic.js"
import { insertCharAtCursor, applyBackspace } from "./textInput.js"
import { ROW_0_KEYS, ROW_1_KEYS, ROW_2_KEYS, ROW_3_KEYS } from "./constants.js"

const alphabetWrap = document.getElementById("alphabet-wrap")
const textInput = document.getElementById("input")

let isShiftEnabled = false
let currentLayout = "A"
const keyCodeToChar = {}

/**
 * @param {Object} layout
 * @param {HTMLElement} container
 * @param {Boolean} isShiftEnabled
 */
const renderLayout = (layout, container, isShiftEnabled = false) => {
  const hasVowels = Object.keys(layout).includes(ROW_0_KEYS[0])
  const rows = [hasVowels ? ROW_0_KEYS : [], ROW_1_KEYS, ROW_2_KEYS, ROW_3_KEYS]

  container.innerHTML = ""

  rows.forEach((rowKeys) => {
    const rowContainer = document.createElement("div")
    rowContainer.classList.add("keyboard-row")
    rowContainer.style.display = "grid"
    rowContainer.style.gridTemplateColumns = `repeat(${rowKeys.length}, minmax(20px, 80px))`
    rowContainer.style.placeContent = "center"

    rowKeys.forEach((keyCode) => {
      const keyData = layout[keyCode]
      if (!keyData) {
        return
      }

      const isBlank = keyData.letter === "blank"
      const isFinalForm = isShiftEnabled && keyData.finalForm
      const isVowel = ROW_0_KEYS.includes(keyCode)

      const button = document.createElement("button")
      button.className = `key ${isVowel ? "vowel" : ""}`
      button.setAttribute("title", isBlank ? "" : keyData.title)
      button.setAttribute(
        "data-char",
        isBlank ? "" : isFinalForm ? keyData.finalForm : keyData.letter
      )
      button.setAttribute("data-key", keyCode)

      const letterChar = document.createElement("span")
      letterChar.className = `letter ${isVowel ? "vowel" : ""}`
      letterChar.textContent = isBlank ? "" : isFinalForm ? keyData.finalForm : keyData.letter

      const qwertyChar = document.createElement("span")
      qwertyChar.className = "qwerty"
      qwertyChar.textContent = keyData.qwertyLetter || ""

      const finalFormChar = document.createElement("span")
      finalFormChar.className = "final-form"
      finalFormChar.textContent = isBlank
        ? ""
        : isFinalForm
        ? keyData.letter
        : keyData.finalForm || ""

      button.appendChild(letterChar)
      button.appendChild(qwertyChar)
      button.appendChild(finalFormChar)

      rowContainer.appendChild(button)
    })
    container.appendChild(rowContainer)
  })

  const keys = container.querySelectorAll(".key")
  keys.forEach((key) => {
    const dataKey = key.getAttribute("data-key")
    const dataChar = key.getAttribute("data-char")
    if (typeof dataKey === "string" && typeof dataChar === "string") {
      keyCodeToChar[dataKey] = dataChar
    }
  })
}

const toggleShift = () => {
  if (currentLayout === "A") {
    isShiftEnabled = !isShiftEnabled

    if (isShiftEnabled) {
      shiftSymbol.setAttribute("style", "fill: #0e0e0e")
    } else {
      shiftSymbol.setAttribute("style", "fill: none")
    }
    renderLayout(standardLayout, alphabetWrap, isShiftEnabled)
  }
}

const resetShift = () => {
  isShiftEnabled = false
  shiftSymbol.setAttribute("style", "fill: none")
}

renderLayout(standardLayout, alphabetWrap, isShiftEnabled)

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
  resetShift()
  renderLayout(standardLayout, alphabetWrap, isShiftEnabled)
})
layoutBKey.addEventListener("click", function () {
  currentLayout = "B"
  layoutBKey.className = "layout-button layout-button--active"
  layoutAKey.className = "layout-button"
  layoutCKey.className = "layout-button"
  layoutDKey.className = "layout-button"
  resetShift()
  renderLayout(standardFlatLayout, alphabetWrap, isShiftEnabled)
})
layoutCKey.addEventListener("click", function () {
  currentLayout = "C"
  layoutCKey.className = "layout-button layout-button--active"
  layoutAKey.className = "layout-button"
  layoutBKey.className = "layout-button"
  layoutDKey.className = "layout-button"
  resetShift()
  renderLayout(paleoLayout, alphabetWrap, isShiftEnabled)
})
layoutDKey.addEventListener("click", function () {
  currentLayout = "D"
  layoutDKey.className = "layout-button layout-button--active"
  layoutAKey.className = "layout-button"
  layoutBKey.className = "layout-button"
  layoutCKey.className = "layout-button"
  resetShift()
  renderLayout(aramaicLayout, alphabetWrap, isShiftEnabled)
})

document.addEventListener("keydown", (event) => {
  const keyElement = document.querySelector(`.key[data-key="${event.code}"]`)
  if (!keyElement) {
    return
  }
  keyElement.classList.add("pressed")
  if (event.ctrlKey) {
    if (event.key === "c" || event.key === "v" || ROW_0_KEYS.includes(event.code)) {
      return
    }
  }
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
