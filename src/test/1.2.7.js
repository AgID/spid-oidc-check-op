const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_7 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.7";
    this.description =
      "The value of claim sub MUST be equal to the value of claim iss";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (this.metadata.iss !== this.metadata.sub) {
      this.notes = "sub" + this.metadata.iss + " != " + this.metadata.sub;
      throw "claim iss is not equal to the claim sub";
    } else {
      this.notes = "sub" + this.metadata.iss + " == " + this.metadata.sub;
      return true;
    }
  }
}

module.exports = Test_1_2_7;
