const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_31 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.31';
    this.description = 'The revocation_endpoint_auth_methods_supported MUST contain the value private_key_jwt';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.revocation_endpoint_auth_methods_supported==null
      || this.metadata.configuration.revocation_endpoint_auth_methods_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim revocation_endpoint_auth_methods_supported is not present");
    }

    if (!Array.isArray(this.metadata.configuration.revocation_endpoint_auth_methods_supported)) {
      this.notes = this.metadata.configuration.revocation_endpoint_auth_methods_supported;
      throw 'The value of revocation_endpoint_auth_methods_supported is not a valid JSON array';
    }

    if(!this.metadata.configuration.revocation_endpoint_auth_methods_supported.includes('private_key_jwt')) {
      this.notes = this.metadata.configuration.revocation_endpoint_auth_methods_supported;
      throw 'The value of revocation_endpoint_auth_methods_supported does not contain the value private_key_jwt';      
    }

    this.notes = this.metadata.configuration.revocation_endpoint_auth_methods_supported;
    return true;
  }
}

module.exports = Test_1_3_31;
