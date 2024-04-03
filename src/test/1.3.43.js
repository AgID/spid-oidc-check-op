const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_3_43 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.3.43';
    this.description = 'The value of request_authentication_methods_supported MUST be a valid JSON object containing the claim authorization_endpoint with value [request_object]';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    
    if(this.metadata.configuration.request_authentication_methods_supported==null
      || this.metadata.configuration.request_authentication_methods_supported=='') {
      this.notes = this.metadata.configuration;
      throw("the claim request_authentication_methods_supported is not present");
    }

    if (!Array.isArray(this.metadata.configuration.request_authentication_methods_supported)) {
      this.notes = this.metadata.configuration.request_authentication_methods_supported;
      throw 'The value of request_authentication_methods_supported is not a valid JSON array';
    }

    if(this.metadata.configuration.request_authentication_methods_supported.authorization_endpoint==null
      || this.metadata.configuration.request_authentication_methods_supported.authorization_endpoint=='') {
      this.notes = this.metadata.configuration.request_authentication_methods_supported;
      throw("the claim request_authentication_methods_supported.authorization_endpoint is not present");
    }

    if (!Array.isArray(this.metadata.configuration.request_authentication_methods_supported.authorization_endpoint)) {
      this.notes = this.metadata.configuration.request_authentication_methods_supported.authorization_endpoint;
      throw 'The value of request_authentication_methods_supported.authorization_endpoint is not a valid JSON array';
    }

    if(!this.metadata.configuration.request_authentication_methods_supported.authorization_endpoint.includes('request_object')) {
      this.notes = this.metadata.configuration.request_authentication_methods_supported.authorization_endpoint;
      throw 'The value of request_authentication_methods_supported.authorization_endpoint does not contain the value request_object';      
    }

    this.notes = this.metadata.configuration.request_authentication_methods_supported.authorization_endpoint;
    return true;
  }
}

module.exports = Test_1_3_43;
