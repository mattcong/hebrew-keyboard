document.querySelectorAll(".key").forEach(function (key) {
  key.addEventListener("click", function () {
    const keyValue = key.textContent
    const textInput = document.getElementById("input")
    textInput.value += keyValue
  })
})
