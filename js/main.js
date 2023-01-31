"use strict";
// ZXCVBN works because it is added in HTML in global namespace
import Slider from "./slider.js";
const strengthBar = document.querySelector(
  "#password-generator > div > div.strength-meter"
);

let result = zxcvbn("696969420");
const passwordStrengthLevels = [
  { level: 1, width: 20, color: "#a60505" },
  { level: 2, width: 35, color: "#DE9205" },
  { level: 3, width: 50, color: "#ffe605" },
  { level: 4, width: 75, color: "#8AB912" },
  { level: 5, width: 100, color: "#148c1e" },
];
console.log(result);
//fetch('https://random-word-api.herokuapp.com/word')

const refreshBtn = document.querySelector(
  "#password-generator > div > div.input > div > button.refresh-btn > i"
);
let refreshCounter = 0;

function setStrengthBarLevel(num) {
  const level = passwordStrengthLevels.find((element) => element.level === num);
  level;
  strengthBar.style.width = `${level.width}%`;
  strengthBar.style.backgroundColor = `${level.color}`;
}

new Slider(
  "#password-length-slider",
  5,
  50,
  "#password-length-slider + label span"
);

// checkboxes
const checkboxes = document.querySelectorAll(
  ".setting.include [class^=ckbx] input"
);

const passwordLength = document.querySelector(
  "#password-length-slider + label"
);

const passwordBox = document.querySelector("#password-box");

const chars = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  symbols: `!@#$%^&*(),./<>;':`,
  numbers: `1234567890`,
};
function generatePassword(length, nodeList) {
  let checkboxesArray = Array.from(nodeList);
  let randomChars = checkboxesArray
    .filter((item) => item.checked)
    .reduce((stringOfChars, checkboxItem) => {
      return (stringOfChars += chars[checkboxItem.dataset.function]);
    }, "");
  let result = "";
  for (let i = 0; i < length; i++) {
    result += getRandomCharFromString(randomChars);
  }
  return result;
}

function getRandomCharFromString(string) {
  return string[Math.floor(Math.random() * string.length)];
}

const passwordGenerator = document.querySelector("#password-generator");
passwordGenerator.addEventListener("submit", (event) => {
  event.preventDefault();
  updateAndGeneratePassword();
});

console.log(passwordGenerator);

function updateAndGeneratePassword() {
  let password = generatePassword(passwordLength.textContent, checkboxes);
  passwordBox.value = password;
  setStrengthBarLevel(zxcvbn(password).score + 1);
}

refreshBtn.addEventListener("click", (e) => {
  if (passwordBox.value == "") {
    return;
  }
  updateAndGeneratePassword();
  refreshCounter += 180;
  refreshBtn.style.transform = `rotate(${refreshCounter}deg)`;
});

const clipboardBtnI = document.querySelector("button.clipboard-btn > i");
const clipboardBtn = document.querySelector("button.clipboard-btn");
const areaToLeave = document.querySelector(".password-box .btns");
clipboardBtn.addEventListener("click", (e) => {
  if (passwordBox.value == "") {
    return;
  }
  navigator.clipboard.writeText(passwordBox.value);
  clipboardBtn.ariaLabel = "Copied!";
});

areaToLeave.addEventListener("mouseleave", (e) => {
  console.log(e);
  setTimeout(() => {
    clipboardBtn.ariaLabel = "Copy to Clipboard";
  }, 250);
});

console.log(zxcvbn("123"));
