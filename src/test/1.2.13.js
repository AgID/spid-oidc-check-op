const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_13 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.13';
    this.description = 'The document MUST contain the claim authority_hints';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (
      this.document.authority_hints == null ||
      this.document.authority_hints == ''
    ) {
      this.notes = this.document.authority_hints;
      throw 'claim authority_hints is not present';
    } else {
      this.notes = this.document.authority_hints;
      return true;
    }
  }
}

module.exports = Test_1_2_13;
