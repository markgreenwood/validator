import validatorWith, { rule } from "./validator";
import nonPositiveValidationRule from "./rules/nonPositive";
import nonDivisibleValidationRule from "./rules/nonDivisible";

interface ruleDescription {
  type: string;
  options: any;
};

const ruleFactoryMap: any = {
  nonPositive: function(): rule {
    return nonPositiveValidationRule;
  },
  nonDivisible: function(options: { divisor: number; error: string }): rule {
    return nonDivisibleValidationRule(options.divisor, options.error);
  },
};

function toValidatorRule(ruleDescription: ruleDescription): rule {
  return ruleFactoryMap[ruleDescription.type](ruleDescription.options);
}

export default function(findConfiguration: (ruleset: string) => ruleDescription[]) {
  return function(ruleSetName: string) {
    return validatorWith(findConfiguration(ruleSetName).map(toValidatorRule));
  };
}
