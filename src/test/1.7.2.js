const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_7_2 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.7.2';
    this.description = 'The value of iss inside the TM with role OP MUST be equal to https://registry.spid.gov.it';
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

    let tm_jwt = null;

    for(let ec_tm of entity_statement.trust_marks) {
      if (ec_tm.id=='https://registry.spid.gov.it/openid_provider/') tm_jwt = ec_tm.trust_mark;
    }

    if(tm_jwt==null) {
      this.notes = entity_statement.trust_marks;
      throw 'The trust_marks array does not contain any TM of role OP';
    }

    let tm = jwt_decode(tm_jwt);

    if(tm.iss!='https://registry.spid.gov.it') {
      this.notes = tm.iss;
      throw 'The value of claim iss inside TM of role OP is not equal to https://registry.spid.gov.it';
    }

    this.notes = tm;
    return true;
  }
}

module.exports = Test_1_7_2;
