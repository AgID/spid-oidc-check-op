const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const moment = require('../server/node_modules/moment');

class Test_1_2_11 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.11';
    this.description =
      'The value of the claim exp MUST be a valid unix timestamp';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (!moment.unix(this.document.exp).isValid()) {
      this.notes = this.document.exp;
      throw 'the value of exp is not a valid unix time';
    }

    this.notes = this.document.ext;
    return true;
  }
}

module.exports = Test_1_2_11;
