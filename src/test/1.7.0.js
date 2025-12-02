const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');
const config_rp = require('../config/rp.json');

class Test_1_7_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.7.0';
    this.description = 'The value of claim id inside the TM with role OP private MUST be equal to the value of claim id of related TM into EC';
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
      if (ec_tm.id==config_rp.trust_anchor + '/openid_provider/private/') tm_jwt = ec_tm.trust_mark;
    }

    if(tm_jwt==null) {
      this.notes = entity_statement.trust_marks;
      throw 'The trust_marks array does not contain any TM of role OP private';
    }

    let tm = jwt_decode(tm_jwt);

    if(tm.id!=config_rp.trust_anchor + '/openid_provider/private/') {
      this.notes = tm.id;
      throw 'The value of claim id inside TM of role OP private is not equal to ' + config_rp.trust_anchor + '/openid_provider/private/';
    }

    this.notes = tm;
    return true;
  }
}

module.exports = Test_1_7_0;
