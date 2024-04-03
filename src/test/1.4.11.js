const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_11 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.4.11';
    this.description = 'The metadata SHOULD contain the claim op_policy_uri. DEPRECATED';
    this.validation = 'self';
  }

  async exec() {
    super.exec();

    if(this.metadata.configuration.op_policy_uri != null
      && this.metadata.configuration.op_policy_uri != '') {

      this.notes = "the claim op_policy_uri is CAN, please remove the claim";
      return false;
    }

    this.validation = 'automatic';
    return true;
  }
}

module.exports = Test_1_4_11;
