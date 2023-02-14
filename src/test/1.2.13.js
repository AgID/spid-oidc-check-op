const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_13 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.13";
    this.description = "The document MUST contain the claim authority_hints";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (
      this.metadata.authority_hints == null ||
      this.metadata.authority_hints == ""
    ) {
      this.notes = this.metadata.authority_hints;
      throw "claim authority_hints is not present";
    } else {
      this.notes = this.metadata.authority_hints;
      return true;
    }
  }
}

module.exports = Test_1_2_13;
