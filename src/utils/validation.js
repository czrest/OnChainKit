export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isPopulated(value) {
  return value.length !== 0;
}

export function isEqualToOtherValue(value, otherValue) {
  return value === otherValue;
}
