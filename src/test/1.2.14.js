const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_14 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.14';
    this.description =
      "The authority_hints MUST contain 'https://registry.spid.gov.it'";
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.document = jwt_decode(this.metadata.entity_statement);
    if (
      !this.document.authority_hints.includes('https://registry.spid.gov.it')
    ) {
      this.notes = this.document.authority_hints;
      throw "'https://registry.spid.gov.it' is not present in authority_hints";
    } else {
      this.notes = this.document.authority_hints;
      return true;
    }
  }
}

module.exports = Test_1_2_14;
