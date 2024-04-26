const vowels = [
  { title: "Sheva", dataKey: "Digit1", letter: "ְ", qwertyLetter: "1" },
  { title: "Hataf Segol", dataKey: "Digit2", letter: "ֱ", qwertyLetter: "2" },
  { title: "Hataf Patah", dataKey: "Digit3", letter: "ֲ", qwertyLetter: "3" },
  { title: "Hataf Qamats", dataKey: "Digit4", letter: "ֳ", qwertyLetter: "4" },
  { title: "Hiriq", dataKey: "Digit5", letter: "ִ", qwertyLetter: "5" },
  { title: "Tsere", dataKey: "Digit6", letter: "ֵ", qwertyLetter: "6" },
  { title: "Segol", dataKey: "Digit7", letter: "ֶ", qwertyLetter: "7" },
  { title: "Patah", dataKey: "Digit8", letter: "ַ", qwertyLetter: "8" },
  { title: "Qamats", dataKey: "Digit9", letter: "ָ", qwertyLetter: "9" },
  { title: "Holam", dataKey: "Digit0", letter: "ֹ", qwertyLetter: "0" },
  { title: "Dagesh or Mapiq", dataKey: "Minus", letter: "ּ", qwertyLetter: "-" },
  { title: "Sin Dot", dataKey: "Equal", letter: "ׂ", qwertyLetter: "=" },
]

const consonants = [
  { title: "blank", dataKey: "KeyQ", letter: "blank", qwertyLetter: "Q" },
  { title: "blank", dataKey: "KeyW", letter: "blank", qwertyLetter: "W" },
  { title: "Kuf", dataKey: "KeyE", letter: "ק", qwertyLetter: "E" },
  { title: "Resh", dataKey: "KeyR", letter: "ר", qwertyLetter: "R" },
  { title: "Alef", dataKey: "KeyT", letter: "א", qwertyLetter: "T" },
  { title: "Tet", dataKey: "KeyY", letter: "ט", qwertyLetter: "Y" },
  { title: "Vav", dataKey: "KeyU", letter: "ו", qwertyLetter: "U" },
  { title: "Pe", dataKey: "KeyI", letter: "פ", qwertyLetter: "I", finalForm: "ף" },
  { title: "Shin", dataKey: "KeyO", letter: "ש", qwertyLetter: "O" },
  { title: "Dalet", dataKey: "KeyP", letter: "ד", qwertyLetter: "P" },

  { title: "Gimel", dataKey: "KeyA", letter: "ג", qwertyLetter: "A" },
  { title: "Kaf", dataKey: "KeyS", letter: "כ", qwertyLetter: "S", finalForm: "ך" },
  { title: "Ayin", dataKey: "KeyD", letter: "ע", qwertyLetter: "D" },
  { title: "Yod", dataKey: "KeyF", letter: "י", qwertyLetter: "F" },
  { title: "Het", dataKey: "KeyG", letter: "ח", qwertyLetter: "G" },
  { title: "Lamed", dataKey: "KeyH", letter: "ל", qwertyLetter: "H" },
  { title: "Zayin", dataKey: "KeyJ", letter: "ז", qwertyLetter: "J" },
  { title: "Samekh", dataKey: "KeyK", letter: "ס", qwertyLetter: "K" },
  { title: "Bet", dataKey: "KeyL", letter: "ב", qwertyLetter: "L" },

  { title: "He", dataKey: "KeyZ", letter: "ה", qwertyLetter: "Z" },
  { title: "Nun", dataKey: "KeyX", letter: "נ", qwertyLetter: "X", finalForm: "ן" },
  { title: "Mem", dataKey: "KeyV", letter: "מ", qwertyLetter: "V", finalForm: "ם" },
  { title: "Tsadi", dataKey: "KeyB", letter: "צ", qwertyLetter: "B", finalForm: "ץ" },
  { title: "Tav", dataKey: "KeyN", letter: "ת", qwertyLetter: "N" },
]

export const standardLayout = { vowels: vowels, consonants: consonants }
