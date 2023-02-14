const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_4_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.4.0";
    this.description = "The metadata SHOULD contain the claim scopes_supported";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if (this.metadata.configuration.scopes_supported == null) {
      this.notes =
        "the claim scopes_supported is not present, it's recommended but not mandatory";
      return true;
    }

    this.notes = this.metadata.configuration.scopes_supported;
    return true;
  }
}

module.exports = Test_1_4_0;
