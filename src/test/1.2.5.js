const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_5 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.5';
    this.description = 'The document MUST contain the claim iss';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (this.document.iss == null || this.document.iss == '') {
      this.notes = this.document.iss;
      throw 'claim iss is not present';
    } else {
      this.notes = this.document.iss;
      return true;
    }
  }
}

module.exports = Test_1_2_5;
