const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_12 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.4.12';
    this.description = 'The metadata SHOULD contain the claim op_tos_uri';
    this.validation = 'self';
  }

  async exec() {
    super.exec();

    if (this.metadata.configuration.op_tos_uri == null) {
      this.notes =
        "the claim op_tos_uri is not present, it's recommended but not mandatory";
      return true;
    }

    this.validation = 'automatic';
    this.notes = this.metadata.configuration.op_tos_uri;
    return true;
  }
}

module.exports = Test_1_4_12;
