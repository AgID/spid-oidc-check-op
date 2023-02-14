const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_6 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.6";
    this.description = "The document MUST contain the claim sub";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (this.metadata.sub == null || this.metadata.sub == "") {
      this.notes = this.metadata.sub;
      throw "claim sub is not present";
    } else {
      this.notes = this.metadata.sub;
      return true;
    }
  }
}

module.exports = Test_1_2_6;
