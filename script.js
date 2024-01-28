document.querySelectorAll(".letter, .space, .niqqud").forEach(function (key) {
  key.addEventListener("click", function () {
    const keyValue = key.textContent
    const textInput = document.getElementById("input")
    textInput.value += keyValue
  })
})

document.getElementById("backspaceKey").addEventListener("click", function () {
  const textInput = document.getElementById("input")
  textInput.value = textInput.value.slice(0, -1)
})
