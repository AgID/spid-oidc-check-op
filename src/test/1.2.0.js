const TestMetadata = require("../server/lib/test/TestMetadata.js");
const Validator = require("../server/node_modules/validator");

class Test_1_2_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.0";
    this.description = "Document URL MUST be /.well-known/openid-configuration";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();
    if (
      this.metadata.url == "/.well-known/openid-configuration" ||
      this.metadata.url == "/.well-known/openid-configuration/"
    ) {
      this.notes = "/.well-known/openid-configuration";
      return true;
    } else {
      this.notes =
        this.metadata.url + " != " + "/.well-known/openid-configuration";
      throw "Document URL is not /.well-known/openid-configuration";
    }
  }
}

module.exports = Test_1_2_0;
