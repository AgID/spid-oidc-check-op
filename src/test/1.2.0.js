const TestMetadata = require('../server/lib/test/TestMetadata.js');
const Validator = require('../server/node_modules/validator');

class Test_1_2_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.0';
    this.description = 'Document URL MUST be /.well-known/openid-federation';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    let issuer = this.metadata.configuration.issuer;
    if (issuer.substring(issuer.length - 1) == '/') {
      issuer = issuer.substring(0, issuer.length - 1);
    }

    if (
      this.metadata.url == issuer + '/.well-known/openid-federation' ||
      this.metadata.url == issuer + '/.well-known/openid-federation/'
    ) {
      this.notes = issuer + '/.well-known/openid-federation';
      return true;
    } else {
      this.notes =
        this.metadata.url + ' != ' + issuer + '/.well-known/openid-federation';
      throw 'Document URL is not <issuer>/.well-known/openid-federation';
    }
  }
}

module.exports = Test_1_2_0;
