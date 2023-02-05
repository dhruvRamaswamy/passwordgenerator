import { scale } from "./functions.js";
export default class Slider {
  constructor(selector, min, max, valueLabelSelector) {
    this.id = valueLabelSelector;
    this._min = min;
    this._max = max;
    this._slider = document.querySelector(selector);
    this.value = this._slider.value;
    this._valueLabelSelector = document.querySelector(valueLabelSelector);
    this._slider.addEventListener("input", () => {
      this.setCounter();
    });
    this.setCounter();
  }
  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  set normalValue(value) {
    this._slider.value = scale(
      value,
      this._min,
      this._max,
      this._slider.min,
      this._slider.max
    );
    this.setCounter();
  }

  get scaledValue() {
    return Math.round(
      scale(
        this._slider.value,
        this._slider.min,
        this._slider.max,
        this._min,
        this._max
      )
    );
  }

  setCounter() {
    this._valueLabelSelector.textContent = this.scaledValue;
  }
}
