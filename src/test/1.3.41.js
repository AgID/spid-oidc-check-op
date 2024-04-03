const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_41 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.41';
    this.description = 'The value of client_registration_types_supported MUST be automatic';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.client_registration_types_supported==null
      || this.metadata.configuration.client_registration_types_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim client_registration_types_supported is not present");
    }

    if(this.metadata.configuration.client_registration_types_supported!='automatic') {
      this.notes = this.metadata.configuration.client_registration_types_supported;
      throw 'The value of client_registration_types_supported is not automatic';      
    }

    this.notes = this.metadata.configuration.client_registration_types_supported;
    return true;
  }
}

module.exports = Test_1_3_41;
