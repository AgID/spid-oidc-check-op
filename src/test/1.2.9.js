const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_2_9 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.9';
    this.description =
      'The value of the claim iat MUST be a valid unix timestamp';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.notes = this.metadata.iat;
    if (!moment.unix(this.notes).isValid())
      throw 'the value of iat is not a valid unix time';

    return true;
  }
}

module.exports = Test_1_2_9;
