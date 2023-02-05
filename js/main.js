"use strict";

import Slider from "./slider.js";
import { passwordStrengthLevels } from "./functions.js";
const refreshBtn = document.querySelector("button.refresh-btn > i");
const refreshBtnElement = document.querySelector("button.refresh-btn");
const strengthBar = document.querySelector("div.strength-meter");

// ZXCVBN works because it is added in HTML in global namespace

let refreshCounter = 0;

function setStrengthBarLevel(num) {
  const level = passwordStrengthLevels.find((element) => element.level === num);
  level;
  strengthBar.style.width = `${level.width}%`;
  strengthBar.style.backgroundColor = `${level.color}`;
}

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
  if (randomChars == "") {
    return;
  }
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
  refreshBtnElement.disabled = false;
  clipboardBtn.disabled = false;
});

function updateAndGeneratePassword() {
  let password = generatePassword(passwordLength.textContent, checkboxes);
  if (password == null) {
    setCheckFieldsAlert();
    return;
  }
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
  setTimeout(() => {
    clipboardBtn.ariaLabel = "Copy to Clipboard";
  }, 300);
});

const submitBtn = document.querySelector(".submit-button");
function setCheckFieldsAlert() {
  submitBtn.ariaLabel = "Please check some boxes!";
  submitBtn.classList.add("hint--bottom");
  submitBtn.addEventListener("mouseleave", () => {
    setTimeout(
      () => {
        submitBtn.ariaLabel = "";
      },
      300,
      { once: true }
    );
  });
}

document.body.addEventListener("keydown", (event) => {
  if (event.code == "KeyC" && (event.ctrlKey || event.metaKey)) {
    navigator.clipboard.writeText(passwordBox.value);
    let copiedNotification = document.querySelector(".copied-notification");
    copiedNotification.style.display = "inline";
    document.body.append(copiedNotification);
    let xButton = document.querySelector(".close-button");
    xButton.addEventListener("click", () => {
      copiedNotification.style.display = "none";
    });
    setTimeout(() => {
      copiedNotification.style.display = "none";
    }, 3000);
  }
});

import Settings from "./settings.js";

// Knowing about the event loop here really saved my life

let passwordSlider;
document.addEventListener("DOMContentLoaded", () => {
  passwordSlider = new Slider(
    "#password-length-slider",
    3,
    50,
    "#password-length-slider + label span"
  );
});

setTimeout(() => {
  new Settings(passwordSlider);
}, 0);
