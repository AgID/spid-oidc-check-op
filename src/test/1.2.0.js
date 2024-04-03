const TestMetadata = require('../server/lib/test/TestMetadata.js');
const Validator = require('../server/node_modules/validator');

class Test_1_2_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.0';
    this.description =
      'Document URL MUST be &lt;issuer&gt;/.well-known/openid-federation';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();

    if(this.metadata.type!='federation') {
      this.notes = "Metadata is not provided as openid-federation";
      return false;
    } else {

      let issuer = this.metadata.configuration.issuer;
      if (issuer.substring(issuer.length - 1) == '/') {
        issuer = issuer.substring(0, issuer.length - 1);
      }
  
      this.notes = this.metadata.url;
  
      if (
        this.notes == `${issuer}/.well-known/openid-federation` ||
        this.notes == `${issuer}/.well-known/openid-federation/`
      ) {
        return true;

      } else {
        throw 'Document URL is not &lt;issuer&gt;/.well-known/openid-federation';
      }

    }
  }
}

module.exports = Test_1_2_0;
