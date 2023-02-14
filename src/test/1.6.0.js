const TestMetadata = require("../server/lib/test/TestMetadata.js");

class Test_1_6_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.6.0";
    this.description = "The jwks SHOULD contain x5c";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    let jwks = (await axios.get(this.metadata.configuration.jwks_uri)).data;
    if (!jwks.keys.includes("x5c")) {
      this.notes = "x5c is not present, it's recommended but not mandatory";
      return true;
    }
    this.notes = jwks["x5c"];
    return true;
  }
}

module.exports = Test_1_6_0;
