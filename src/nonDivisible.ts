export default function(divisor: number, error: string) {
  return function(value: number, result: string[]) {
    if (value % divisor === 0) result.push(error);
  };
}
