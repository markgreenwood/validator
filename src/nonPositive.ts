export default function(value: number, result: string[]) {
  if (value <= 0) result.push("error.nonpositive");
}
