const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_15 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.15";
    this.description = "The document MUST contain the claim metadata";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (this.metadata.metadata == null || this.metadata.metadata == "") {
      this.notes = this.metadata.metadata;
      throw "claim metadata is not present";
    } else {
      this.notes = this.metadata.metadata;
      return true;
    }
  }
}

module.exports = Test_1_2_15;
