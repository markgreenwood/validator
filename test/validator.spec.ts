import { expect } from "chai";
import validatorWith from "../src/validator";
import nonPositiveValidationRule from "../src/nonPositive";
import nonDivisibleValidationRule from "../src/nonDivisible";

describe("A validator", () => {
  let validator: Function;

  before(() => {
    validator = validatorWith([
      nonPositiveValidationRule,
      nonDivisibleValidationRule(3, "error.three"),
      nonDivisibleValidationRule(5, "error.five"),
    ]);
  });

  it("will return no errors for valid numbers", () => {
    // eslint-disable-next-line no-unused-expressions
    expect(validator(7)).to.be.empty;
  });

  describe("will return error.nonpositive for not strictly positive numbers", () => {
    it("like 0", () => {
      expect(validator(0)).to.include("error.nonpositive");
    });

    it("like -2", () => {
      expect(validator(-2)).to.include("error.nonpositive");
    });
  });

  describe("will include error.three for divisible by 3 numbers", () => {
    it("like 3", () => {
      expect(validator(3)).to.include("error.three");
    });

    it("like 15", () => {
      expect(validator(15)).to.include("error.three");
    });
  });

  describe("will include error.five for divisible by 5 numbers", () => {
    it("like 5", () => {
      expect(validator(5)).to.include("error.five");
    });

    it("like 15", () => {
      expect(validator(15)).to.include("error.five");
    });
  });
});
