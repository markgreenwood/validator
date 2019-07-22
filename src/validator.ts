export interface rule {
  (value: number, result: string[]): string[];
}

export default function(validationRules: rule[]) {
  return function(value: number): string[] {
    return validationRules.reduce(function(result: string[], rule: rule) {
      rule(value, result);
      return result;
    }, []);
  };
}
