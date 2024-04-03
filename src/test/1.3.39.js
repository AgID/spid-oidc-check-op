const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_39 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.39';
    this.description = 'The value of authorization_response_iss_parameter_supported MUST be true';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.authorization_response_iss_parameter_supported==null
      || this.metadata.configuration.authorization_response_iss_parameter_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim authorization_response_iss_parameter_supported is not present");
    }

    if(this.metadata.configuration.authorization_response_iss_parameter_supported!=true) {
      this.notes = this.metadata.configuration.authorization_response_iss_parameter_supported;
      throw 'The value of authorization_response_iss_parameter_supported is not true';      
    }

    this.notes = this.metadata.configuration.authorization_response_iss_parameter_supported;
    return true;
  }
}

module.exports = Test_1_3_39;
