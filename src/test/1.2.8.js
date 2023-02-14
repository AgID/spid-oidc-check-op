const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_8 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.8";
    this.description = "The document MUST contain the claim iat";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (this.metadata.iat == null || this.metadata.iat == "") {
      this.notes = this.metadata.iat;
      throw "claim iat is not present";
    } else {
      this.notes = this.metadata.iat;
      return true;
    }
  }
}

module.exports = Test_1_2_8;
