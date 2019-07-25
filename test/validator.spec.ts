import { expect } from "chai";
// import validatorWith from "../src/validator";
// import nonPositiveValidationRule from "../src/nonPositive";
// import nonDivisibleValidationRule from "../src/nonDivisible";
import factoryWithConfiguration from "../src/factory";

describe("A validation", () => {
  let validator: Function;
  let configuration: any;

  context("using the default validation rules", () => {
    beforeEach(() => {
      configuration = function() {
        configuration.callCount++;
        configuration.args = Array.prototype.slice.call(arguments);
        return [
          { type: "nonPositive" },
          {
            type: "nonDivisible",
            options: { divisor: 3, error: "error.three" },
          },
          {
            type: "nonDivisible",
            options: { divisor: 5, error: "error.five" },
          },
        ];
      };
      configuration.callCount = 0;

      // @ts-ignore
      const newValidator = factoryWithConfiguration(configuration);

      // @ts-ignore
      validator = newValidator("default");
    });

    it("will access the configuration to get the validation rules", () => {
      expect(configuration.callCount).to.equal(1);
      expect(configuration.args).to.deep.equal(["default"]);
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

  context("using the alternative validation rules", () => {
    beforeEach(() => {
      configuration = function() {
        configuration.callCount++;
        configuration.args = Array.prototype.slice.call(arguments);
        return [
          { type: "nonPositive" },
          {
            type: "nonDivisible",
            options: { divisor: 11, error: "error.eleven" },
          },
        ];
      };
      configuration.callCount = 0;

      // @ts-ignore
      const newValidator = factoryWithConfiguration(configuration);

      // @ts-ignore
      validator = newValidator("alternative");
    });

    it("will access the configuration to get the validation rules", () => {
      expect(configuration.callCount).to.equal(1);
      expect(configuration.args).to.deep.equal(["alternative"]);
    });

    it("will return no errors for valid numbers", () => {
      // eslint-disable-next-line no-unused-expressions
      expect(validator(7)).to.be.empty;
    });

    describe("will include error.eleven for numbers divisible by 11", () => {
      it("like 22", () => {
        expect(validator(22)).to.include("error.eleven");
      });
    });
  });
});
