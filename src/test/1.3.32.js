const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_32 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.32';
    this.description = 'The metadata MUST contain the claim code_challenge_methods_supported';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.code_challenge_methods_supported==null
      || this.metadata.configuration.code_challenge_methods_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim code_challenge_methods_supported is not present");
    }

    this.notes = this.metadata.configuration.code_challenge_methods_supported;
    return true;
  }
}

module.exports = Test_1_3_32;
