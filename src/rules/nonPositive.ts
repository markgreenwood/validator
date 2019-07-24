export default function(value: number, result: string[]): string[] {
  if (value <= 0) result.push("error.nonpositive");
  return result;
}
