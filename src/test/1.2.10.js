const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_10 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.10";
    this.description = "The document MUST contain the claim exp";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (this.metadata.exp == null || this.metadata.exp == "") {
      this.notes = this.metadata.exp;
      throw "claim exp is not present";
    } else {
      this.notes = this.metadata.exp;
      return true;
    }
  }
}

module.exports = Test_1_2_10;
