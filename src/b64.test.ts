import * as chai from "chai";

import b64, { from, to } from "./b64";

const expect = chai.expect;

describe("b64", () => {
  describe("from()", () => {
    it("should return a string", () => {
      const s = from("test");

      expect(s).to.be.a("string");
    });

    it("should accept encoding", () => {
      const s = from((1537047054000).toString(16), "hex");

      expect(s).to.equal("3ZrmH4g=");
    });

    it("should be reversible", () => {
      expect(to(from("test"))).to.equal("test");
    });
  });

  describe("to()", () => {
    it("should return a string", () => {
      const s = to("R4JnR+==");

      expect(s).to.be.a("string");
    });

    it("should accept encoding", () => {
      const s = to("3ZrmH4g=", "hex");

      expect(s).to.equal("165df24c6b");
    });

    it("should be reversible", () => {
      expect(to(from("R4JnR+=="))).to.equal("R4JnR+==");
    });
  });

  describe("b64.from()", () => {
    it("should be equal to from()", () => {
      expect(b64.from).to.equal(from);
    });
  });

  describe("b64.to()", () => {
    it("should be equal to to()", () => {
      expect(b64.to).to.equal(to);
    });
  });
});
