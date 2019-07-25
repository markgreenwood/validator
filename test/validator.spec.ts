import chai, { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import sinonChai from "sinon-chai";
import factoryWithConfiguration, { ruleDescription } from "../src/factory";

chai.use(sinonChai);

describe("A validation", () => {
  let validator: Function;

  context("using the default validation rules", () => {
    const configuration: SinonStub = sinon.stub();

    beforeEach(() => {
      configuration.returns([
        { type: "nonPositive" },
        {
          type: "nonDivisible",
          options: { divisor: 3, error: "error.three" },
        },
        {
          type: "nonDivisible",
          options: { divisor: 5, error: "error.five" },
        },
      ]);

      // @ts-ignore
      const newValidator = factoryWithConfiguration(configuration);

      // @ts-ignore
      validator = newValidator("default");
    });

    it("will access the configuration to get the validation rules", () => {
      expect(configuration).to.have.been.calledOnce;
      expect(configuration).to.have.been.calledWithExactly("default");
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
    const configuration: SinonStub = sinon.stub();

    beforeEach(() => {
      configuration.returns([
        { type: "nonPositive" },
        {
          type: "nonDivisible",
          options: { divisor: 11, error: "error.eleven" },
        },
      ]);

      // @ts-ignore
      const newValidator = factoryWithConfiguration(configuration);

      // @ts-ignore
      validator = newValidator("alternative");
    });

    it("will access the configuration to get the validation rules", () => {
      expect(configuration).to.have.been.calledOnce;
      expect(configuration).to.have.been.calledWithExactly("alternative");
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
