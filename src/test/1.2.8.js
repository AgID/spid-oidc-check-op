const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_8 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.8';
    this.description = 'The document MUST contain the claim iat';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (this.document.iat == null || this.document.iat == '') {
      this.notes = this.document.iat;
      throw 'claim iat is not present';
    } else {
      this.notes = this.document.iat;
      return true;
    }
  }
}

module.exports = Test_1_2_8;
