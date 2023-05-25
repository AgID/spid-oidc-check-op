const TestMetadata = require('../server/lib/test/TestMetadata.js');
const Validator = require('../server/node_modules/validator');

class Test_1_2_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.0';
    this.description =
      'Document URL MUST be <issuer>/.well-known/openid-federation';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.issuer = this.metadata.configuration.issuer;
    if (this.issuer.substring(issuer.length - 1) == '/') {
      this.issuer = this.issuer.substring(0, this.issuer.length - 1);
    }

    this.notes = this.metadata.url;

    if (
      this.notes == `${this.issuer}/.well-known/openid-federation` ||
      this.notes == `${this.issuer}/.well-known/openid-federation/`
    ) {
      return true;
    } else {
      throw 'Document URL is not <issuer>/.well-known/openid-federation';
    }
  }
}

module.exports = Test_1_2_0;
