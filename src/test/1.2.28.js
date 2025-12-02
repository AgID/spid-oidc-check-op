const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');
const config_rp = require('../config/rp.json');

class Test_1_2_28 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.28';
    this.description = 'The trust_marks array MUST contain a TM of role OP private';
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

    if (!Array.isArray(entity_statement.trust_marks)) {
      this.notes = entity_statement.trust_marks;
      throw 'The value of trust_marks is not a valid JSON array';
    }

    let valid = false;

    for(let tm of entity_statement.trust_marks) {
      valid = valid || (tm.id==config_rp.trust_anchor + '/openid_provider/private/');
    }

    if(!valid) {
      this.notes = entity_statement.trust_marks;
      throw 'The trust_marks array does not contain any TM of role OP';
    }

    this.notes = entity_statement.trust_marks;
    return true;
  }
}

module.exports = Test_1_2_28;
