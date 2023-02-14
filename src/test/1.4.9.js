const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_4_9 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.4.9";
    this.description =
      "The metadata SHOULD contain the claim claims_parameter_supported";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if (this.metadata.configuration.claims_parameter_supported == null) {
      this.notes =
        "the claim claims_parameter_supported is not present, it's recommended but not mandatory";
      return true;
    }

    this.notes = this.metadata.configuration.claims_parameter_supported;
    return true;
  }
}

module.exports = Test_1_4_9;
