const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_15 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.15';
    this.description = 'The document MUST contain the claim metadata';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (this.document.metadata == null || this.document.metadata == '') {
      this.notes = this.document.metadata;
      throw 'claim metadata is not present';
    } else {
      this.notes = this.document.metadata;
      return true;
    }
  }
}

module.exports = Test_1_2_15;
