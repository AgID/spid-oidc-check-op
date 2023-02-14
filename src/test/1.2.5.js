const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_5 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.5";
    this.description = "The document MUST contain the claim iss";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (this.metadata.iss == null || this.metadata.iss == "") {
      this.notes = this.metadata.iss;
      throw "claim iss is not present";
    } else {
      this.notes = this.metadata.iss;
      return true;
    }
  }
}

module.exports = Test_1_2_5;
