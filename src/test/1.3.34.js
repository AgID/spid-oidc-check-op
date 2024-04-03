const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_34 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.34';
    this.description = 'The code_challenge_methods_supported array MUST contain the value S256';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.code_challenge_methods_supported==null
      || this.metadata.configuration.code_challenge_methods_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim code_challenge_methods_supported is not present");
    }

    if (!Array.isArray(this.metadata.configuration.code_challenge_methods_supported)) {
      this.notes = this.metadata.configuration.code_challenge_methods_supported;
      throw 'The value of code_challenge_methods_supported is not a valid JSON array';
    }

    if(!this.metadata.configuration.code_challenge_methods_supported.includes('S256')) {
      this.notes = this.metadata.configuration.code_challenge_methods_supported;
      throw 'The value of code_challenge_methods_supported does not contain the value S256';      
    }

    this.notes = this.metadata.configuration.code_challenge_methods_supported;
    return true;
  }
}

module.exports = Test_1_3_34;
