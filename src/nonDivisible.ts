import { rule } from "./validator";

export default function(divisor: number, error: string): rule {
  return function(value: number, result: string[]): string[] {
    if (value % divisor === 0) result.push(error);
    return result;
  };
}
