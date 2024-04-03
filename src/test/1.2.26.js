const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_2_26 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.26';
    this.description = 'The document MUST contain the claim trust_marks';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    if(this.metadata.type!='federation') {
      this.notes = "Metadata is not provided as openid-federation";
      return false;
    }
    
    let entity_statement = jwt_decode(this.metadata.entity_statement);

    if (entity_statement.trust_marks == null || entity_statement.trust_marks == '') {
      this.notes = entity_statement;
      throw 'the claim trust_marks is not present';
    }

    this.notes = entity_statement.trust_marks;
    return true;
  }
}

module.exports = Test_1_2_26;
