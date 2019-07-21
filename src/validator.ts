export default function validator(value: Number) {
  if (value === 0) {
    return ["error.nonpositive"];
  }
  return [];
}
