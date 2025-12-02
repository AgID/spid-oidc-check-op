const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_14 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.14';
    this.description =
      "The authority_hints MUST contain 'https://registry.spid.gov.it' and 'https://registry-test.spid.gov.it'";
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    if(this.metadata.type!='federation') {
      this.notes = "Metadata is not provided as openid-federation";
      return false;
    }
    
    let authority_hints = jwt_decode(this.metadata.entity_statement).authority_hints;
    this.notes = authority_hints;

    if(!(authority_hints.includes('https://registry.spid.gov.it') && authority_hints.includes('https://registry-test.spid.gov.it'))) {
      if(!authority_hints.includes('https://registry.spid.gov.it')) {
        throw "'https://registry.spid.gov.it' is not present in authority_hints";
      }
      if(!authority_hints.includes('https://registry-test.spid.gov.it')) {
        throw "'https://registry-test.spid.gov.it' is not present in authority_hints";
      }      
    }

    return true;
  }
}

module.exports = Test_1_2_14;
