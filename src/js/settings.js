// Fml, the code I am about to write is pretty shit. Pls don't do what I did here, it is a cheap way to select all the relevant items.

// Not many pure functions, mostly OOP crap
let checkboxSettings = document.querySelectorAll(
  `.setting.include > div > input`
);
let passwordLengthSliderObj;
// , #password-length-slider
let LCL_STORAGE_SLIDER_KEY = "settings";
let LCL_STORAGE_SETTING_ITEMS_KEY = "setting-items";
export default class Settings {
  constructor(passwordLengthSlider) {
    // I am going to pass the slider object one by one each time. I know this is bad, but this is not a very big project and I should be fine if I only pass in one or two, fml though
    // In the future, I will probably use react/redux
    passwordLengthSliderObj = passwordLengthSlider;
    writeToDomFromLocalStorage();
    window.addEventListener("unload", () => {
      writeToLocalStorage();
    });
  }
}
let slidersArray = [];
let checkboxDataStorage = [];
function readInfoFromDOM() {
  checkboxDataStorage = [];
  slidersArray = [];

  let checkboxSettingArr = Array.from(checkboxSettings);
  //   Read all checkboxes
  for (let setting of checkboxSettingArr) {
    let localObj = {};
    localObj.function = setting.dataset.function;
    localObj.type = setting.type;
    localObj.checked = setting.checked;
    checkboxDataStorage.push(localObj);
  }
  //   Read Slider(s)
  let passwordSliderObject = {
    value: passwordLengthSliderObj.scaledValue,
    id: passwordLengthSliderObj.id,
  };
  slidersArray.push(passwordSliderObject);
  return [checkboxDataStorage, slidersArray];
}

function writeToDomFromLocalStorage() {
  let data = readFromLocalStorage();
  if (data == null) {
    return;
  }
  let [checkboxData, sliderData] = data;
  let functionCheckbox;
  let functionObj;
  for (let checkboxDataItem of checkboxData) {
    functionCheckbox = checkboxDataItem.function;
    functionObj = document.querySelector(
      `[data-function='${functionCheckbox}']`
    );

    functionObj.checked = checkboxDataItem.checked;
  }
  writeToSlider(passwordLengthSliderObj, sliderData[0]);

  //   writing to the slider
}

function writeToLocalStorage() {
  let info = readInfoFromDOM();
  let [checkboxData, sliderData] = [
    JSON.stringify(info[0]),
    JSON.stringify(info[1]),
  ];
  localStorage.setItem(LCL_STORAGE_SLIDER_KEY, sliderData);
  localStorage.setItem(LCL_STORAGE_SETTING_ITEMS_KEY, checkboxData);
  return [checkboxData, sliderData];
}
// Make logic to see if there is none
function readFromLocalStorage() {
  if (checkIfLocalStorageForSettingsEmpty()) {
    return null;
  }
  let checkboxData = JSON.parse(
    localStorage.getItem(LCL_STORAGE_SETTING_ITEMS_KEY)
  );
  let sliderData = JSON.parse(localStorage.getItem(LCL_STORAGE_SLIDER_KEY));
  return [checkboxData, sliderData];
}
// read info from

function checkIfLocalStorageForSettingsEmpty() {
  return (
    !localStorage.getItem(LCL_STORAGE_SETTING_ITEMS_KEY) ||
    !localStorage.getItem(LCL_STORAGE_SLIDER_KEY)
  );
}

function writeToSlider(sliderObj, localStorageData) {
  console.log(sliderObj, localStorageData);
  sliderObj.normalValue = localStorageData.value;
}
