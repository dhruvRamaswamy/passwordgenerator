"use strict";

import Slider from "./slider.js";
import { passwordStrengthLevels } from "./functions.js";
import { chars } from "./functions.js";
const btn_regenerate = document.querySelector("button.refresh-btn > i");
const btn_containerRefresh = document.querySelector("button.refresh-btn");
const element_strengthBar = document.querySelector("div.strength-meter");
const checkboxes = document.querySelectorAll(
  ".setting.include [class^=ckbx] input"
);
const passwordLength = document.querySelector(
  "#password-length-slider + label"
);
const passwordBox = document.querySelector("#password-box");

let refreshCounter = 0;
// ZXCVBN works because it is added in HTML in global namespace

function setStrengthBarLevel(num) {
  const level = passwordStrengthLevels.find(
    (obj_level) => obj_level.level === num
  );
  element_strengthBar.style.width = `${level.width}%`;
  element_strengthBar.style.backgroundColor = `${level.color}`;
  element_strengthBar.style.opacity = "1";
}

function autoSetStrengthBarLevel() {
  setStrengthBarLevel(zxcvbn(passwordBox.value).score + 1);
}

passwordBox.addEventListener("input", (e) => {
  autoSetStrengthBarLevel();
  if (passwordBox.value == "") {
    element_strengthBar.style.opacity = "0";
  }
});

function generatePassword(length, nodeList) {
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

function getRandomCharFromString(string) {
  return string[Math.floor(Math.random() * string.length)];
}

const passwordGenerator = document.querySelector("#password-generator");
passwordGenerator.addEventListener("submit", (event) => {
  generateUpdateUI(event);
});

document.onkeydown = function (event) {
  if (event.key === "Enter") {
    generateUpdateUI(event);
  }
};

function generateUpdateUI(event) {
  event.preventDefault();
  updateAndGeneratePassword();
  btn_containerRefresh.disabled = false;
  clipboardBtn.disabled = false;
  btn_regenerate.click();
}

function updateAndGeneratePassword() {
  let password = generatePassword(passwordLength.textContent, checkboxes);
  if (password == null) {
    setCheckFieldsAlert();
    return;
  }
  passwordBox.value = password;
  autoSetStrengthBarLevel();
}

btn_regenerate.addEventListener("click", (e) => {
  if (passwordBox.value == "") {
    return;
  }
  updateAndGeneratePassword();
  refreshCounter += 180;
  btn_regenerate.style.transform = `rotate(${refreshCounter}deg)`;
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

document.addEventListener("paste", (event) => {
  passwordBox.value = event.clipboardData.getData("text/plain");
  autoSetStrengthBarLevel();
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

document.addEventListener("copy", () => {
  if (passwordBox.value == "") {
    return;
  }
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
  }, 2500);
});

import Settings from "./settings.js";

// Knowing about the event loop here really saved my life

let passwordSlider;
let objsettings;
document.addEventListener("DOMContentLoaded", () => {
  passwordSlider = new Slider(
    "#password-length-slider",
    3,
    50,
    "#password-length-slider + label span"
  );
  objsettings = new Settings(passwordSlider);
});

setTimeout(() => {}, 0);
