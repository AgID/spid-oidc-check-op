const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_35 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.35';
    this.description = 'The metadata MUST contain the claim response_modes_supported';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.response_modes_supported==null
      || this.metadata.configuration.response_modes_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim response_modes_supported is not present");
    }

    this.notes = this.metadata.configuration.response_modes_supported;
    return true;
  }
}

module.exports = Test_1_3_35;
