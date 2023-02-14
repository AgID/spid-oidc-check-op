const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_2_14 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.14";
    this.description =
      "The authority_hints MUST contain 'https://registry.spid.gov.it'";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (
      !this.metadata.authority_hints.includes("https://registry.spid.gov.it")
    ) {
      this.notes = this.metadata.authority_hints;
      throw "'https://registry.spid.gov.it' is not present in authority_hints";
    } else {
      this.notes = this.metadata.authority_hints;
      return true;
    }
  }
}

module.exports = Test_1_2_14;
