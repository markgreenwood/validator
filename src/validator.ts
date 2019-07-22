import nonPositiveValidationRule from "./nonPositive";
import makeNonDivisibleValidationRule from "./nonDivisible";

const validationRules = [
  nonPositiveValidationRule,
  makeNonDivisibleValidationRule(3, 'error.three'),
  makeNonDivisibleValidationRule(5, 'error.five'),
];

export default function (value: number): string[] {
  return validationRules.reduce(function(result, rule) {
    rule(value, result);
    return result;
  }, []);
}
