// const { expect } = require("chai");
import { expect } from "chai";
import validator from "../src/validator";

describe("A validator", () => {
  it("will return error.nonpositive for not strictly positive numbers", () => {
    expect(validator(0)).to.deep.equal(["error.nonpositive"]);
  });

  it("will return no errors for valid numbers", () => {
    // eslint-disable-next-line no-unused-expressions
    expect(validator(3)).to.be.empty;
  });
});
