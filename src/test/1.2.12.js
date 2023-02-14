const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_12 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.12";
    this.description = "The document MUST contain the claim jwks";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (this.metadata.jwks == null || this.metadata.jwks == "") {
      this.notes = this.metadata.jwks;
      throw "claim jwks is not present";
    } else {
      this.notes = this.metadata.jwks;
      return true;
    }
  }
}

module.exports = Test_1_2_12;
