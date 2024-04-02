const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_10 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.10';
    this.description = 'The document MUST contain the claim exp';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    if(this.metadata.type!='federation') {
      this.notes = "Metadata is not provided as openid-federation";
      return false;
    }

    this.notes = jwt_decode(this.metadata.entity_statement).exp;
    if (this.notes == null || this.notes == '')
      throw 'claim exp is not present';
    return true;
  }
}

module.exports = Test_1_2_10;
