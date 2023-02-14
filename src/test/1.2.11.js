const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_11 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.11";
    this.description =
      "The value of the claim exp MUST be a valid unix timestamp";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if (!moment.unix(metadata.ext).isValid()) {
      this.notes = metadata.ext;
      throw "the value of ext is not a valid unix time";
    }

    this.notes = this.metadata.ext;
    return true;
  }
}

module.exports = Test_1_2_11;
