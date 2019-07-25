import validatorWith, { rule } from "./validator";
import nonPositiveValidationRule from "./rules/nonPositive";
import nonDivisibleValidationRule from "./rules/nonDivisible";

export interface ruleDescription {
  type: string;
  options?: {
    divisor?: number;
    error?: string;
  };
}

// list of rule types and the function that creates them
const ruleFactoryMap: any = {
  nonPositive: (): rule => {
    return nonPositiveValidationRule;
  },
  nonDivisible: (options: { divisor: number; error: string }): rule => {
    return nonDivisibleValidationRule(options.divisor, options.error);
  },
};

// takes a rule description and converts it to a rule
function toValidatorRule(ruleDescription: ruleDescription): rule {
  return ruleFactoryMap[ruleDescription.type](ruleDescription.options);
}

// findConfiguration takes a ruleset name and returns an array of rule descriptions;
// the resulting array of rule descriptions is mapped to an array of rules
export default function(
  findConfiguration: (ruleset: string) => ruleDescription[],
) {
  return (ruleSetName: string) => {
    return validatorWith(findConfiguration(ruleSetName).map(toValidatorRule));
  };
}
