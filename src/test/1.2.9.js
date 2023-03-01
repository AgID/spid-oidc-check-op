const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const moment = require('../server/node_modules/moment');

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
    this.notes = jwt_decode(this.metadata.entity_statement).iat;
    if (!moment.unix(this.notes).isValid())
      throw 'the value of iat is not a valid unix time';
    return true;
  }
}

module.exports = Test_1_2_9;
