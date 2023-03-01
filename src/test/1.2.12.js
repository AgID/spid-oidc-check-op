const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_12 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.12';
    this.description = 'The document MUST contain the claim jwks';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (this.document.jwks == null || this.document.jwks == '') {
      this.notes = this.document.jwks;
      throw 'claim jwks is not present';
    } else {
      this.notes = this.document.jwks;
      return true;
    }
  }
}

module.exports = Test_1_2_12;
