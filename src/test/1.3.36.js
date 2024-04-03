const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_36 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.36';
    this.description = 'The value of response_modes_supported MUST be a valid JSON array';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.response_modes_supported==null
      || this.metadata.configuration.response_modes_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim response_modes_supported is not present");
    }

    if (!Array.isArray(this.metadata.configuration.response_modes_supported)) {
      this.notes = this.metadata.configuration.response_modes_supported;
      throw 'The value of response_modes_supported is not a valid JSON array';
    }

    this.notes = this.metadata.configuration.response_modes_supported;
    return true;
  }
}

module.exports = Test_1_3_36;
