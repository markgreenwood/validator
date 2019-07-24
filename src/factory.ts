import validatorWith from "./validator";
import nonPositiveValidationRule from "./rules/nonPositive";
import nonDivisibleValidationRule from "./rules/nonDivisible";

export default function(findConfiguration: (ruleset: string) => void) {
  return function() {
    findConfiguration('default');
    return validatorWith([
      nonPositiveValidationRule,
      nonDivisibleValidationRule(3, "error.three"),
      nonDivisibleValidationRule(5, "error.five"),
    ]);
  };
}
