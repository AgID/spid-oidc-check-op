const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_6 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.6';
    this.description = 'The document MUST contain the claim sub';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (this.document.sub == null || this.document.sub == '') {
      this.notes = this.document.sub;
      throw 'claim sub is not present';
    } else {
      this.notes = this.document.sub;
      return true;
    }
  }
}

module.exports = Test_1_2_6;
