const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_4_6 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.4.6";
    this.description =
      "The metadata SHOULD contain the claim token_endpoint_auth_signing_alg_values_supported";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if (
      this.metadata.configuration
        .token_endpoint_auth_signing_alg_values_supported == null
    ) {
      this.notes =
        "the claim token_endpoint_auth_signing_alg_values_supported is not present, it's recommended but not mandatory";
      return true;
    }

    this.notes =
      this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
    return true;
  }
}

module.exports = Test_1_4_6;
