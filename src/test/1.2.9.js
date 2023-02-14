const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_9 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.9";
    this.description =
      "The value of the claim iat MUST be a valid unix timestamp";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if (!moment.unix(metadata.iat).isValid()) {
      this.notes = metadata.iat;
      throw "the value of iat is not a valid unix time";
    } else {
      this.notes = this.metadata.iat;
      return true;
    }
  }
}

module.exports = Test_1_2_9;
