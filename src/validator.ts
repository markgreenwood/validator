export interface rule {
  (value: number, result: string[]): string[];
}

export default function(validationRules: rule[]) {
  return (value: number): string[] => {
    return validationRules.reduce((result: string[], rule: rule) => {
      rule(value, result);
      return result;
    }, []);
  };
}
