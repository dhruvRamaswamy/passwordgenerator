export function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export const passwordStrengthLevels = [
  { level: 1, width: 15, color: "#a60505" },
  { level: 2, width: 35, color: "#DE9205" },
  { level: 3, width: 50, color: "#ffe605" },
  { level: 4, width: 75, color: "#8AB912" },
  { level: 5, width: 100, color: "#148c1e" },
];

export const chars = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  symbols: `!@#$%^&*(),./<>;':`,
  numbers: `1234567890`,
};

export function setStrengthBarLevel(
  element_strengthBar,
  passwordStrengthLevels,
  num
) {
  const level = passwordStrengthLevels.find(
    (obj_level) => obj_level.level === num
  );
  element_strengthBar.style.width = `${level.width}%`;
  element_strengthBar.style.backgroundColor = `${level.color}`;
  element_strengthBar.style.opacity = "1";
}

export function getRandomCharFromString(string) {
  return string[Math.floor(Math.random() * string.length)];
}

export function generatePassword(length, nodeList) {
  let checkboxesArray = Array.from(nodeList);
  let charsToUseForPassword = checkboxesArray
    .filter((item) => item.checked)
    .reduce((stringOfChars, checkboxItem) => {
      return (stringOfChars += chars[checkboxItem.dataset.function]);
    }, "");
  if (charsToUseForPassword == "") {
    return;
  }
  let result = "";
  for (let i = 0; i < length; i++) {
    result += getRandomCharFromString(charsToUseForPassword);
  }
  return result;
}
