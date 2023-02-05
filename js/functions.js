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
