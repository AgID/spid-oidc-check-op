const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_7 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.7';
    this.description =
      'The value of claim sub MUST be equal to the value of claim iss';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    if(this.metadata.type!='federation') {
      this.notes = "N/A (document is not provided as openid-federation)";
      return true;
    }
    this.document = jwt_decode(this.metadata.entity_statement);
    if (this.document.iss !== this.document.sub) {
      this.notes = `iss ${this.document.iss} != sub ${this.document.sub}`;
      throw 'claim iss is not equal to the claim sub';
    } else {
      this.notes = `iss ${this.document.iss} == sub ${this.document.sub}`;
      return true;
    }
  }
}

module.exports = Test_1_2_7;
