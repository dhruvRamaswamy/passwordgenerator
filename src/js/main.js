"use strict";
import "./../scss/main.scss";
import Slider from "./slider.js";
import Settings from "./settings.js";
import { passwordStrengthLevels } from "./functions.js";
import { setStrengthBarLevel } from "./functions.js";
import { generatePassword } from "./functions.js";
const zxcvbn = require("zxcvbn");
const btn_regenerate = document.querySelector("button.refresh-btn > i");
const btn_containerRefresh = document.querySelector("button.refresh-btn");
const element_strengthBar = document.querySelector("div.strength-meter");
const passwordGenerator = document.querySelector("#password-generator");
const submitBtn = document.querySelector(".submit-button");
const checkboxes = document.querySelectorAll(
  ".setting.include [class^=ckbx] input"
);
const passwordLength = document.querySelector(
  "#password-length-slider + label"
);
const passwordBox = document.querySelector("#password-box");
const clipboardBtn = document.querySelector(".clipboard-btn");
const areaToLeave = document.querySelector(".password-box .btns");
let passwordSlider;
let objsettings;
let refreshCounter = 0;

passwordBox.addEventListener("input", () => {
  setStrengthBarLevelNoParam();
  if (passwordBox.value == "") {
    element_strengthBar.style.opacity = "0";
  }
});

passwordGenerator.addEventListener("submit", (event) => {
  generateUpdateUI(event);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateUpdateUI(event);
  }
  passwordBox.focus();
});

btn_regenerate.addEventListener("click", (e) => {
  if (passwordBox.value == "") {
    return;
  }
  updateAndGeneratePassword();
  refreshCounter += 180;
  btn_regenerate.style.transform = `rotate(${refreshCounter}deg)`;
});

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

document.addEventListener("copy", () => {
  if (passwordBox.value == "") {
    return;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  passwordSlider = new Slider(
    "#password-length-slider",
    3,
    50,
    "#password-length-slider + label span"
  );
});

function setStrengthBarLevelNoParam() {
  setStrengthBarLevel(
    element_strengthBar,
    passwordStrengthLevels,
    zxcvbn(passwordBox.value).score + 1
  );
}

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

document.addEventListener("DOMContentLoaded", () => {
  passwordSlider = new Slider(
    "#password-length-slider",
    3,
    50,
    "#password-length-slider + label span"
  );
  objsettings = new Settings(passwordSlider);
});

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
  setStrengthBarLevelNoParam();
}
