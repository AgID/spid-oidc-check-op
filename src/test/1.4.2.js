const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_2 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.4.2';
    this.description =
      'The metadata MUST contain the claim grant_types_supported';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();

    if(this.metadata.configuration.grant_types_supported == null
      || this.metadata.configuration.grant_types_supported == '') {
        
      this.notes = this.metadata;
      throw "the claim grant_types_supported is not present";
      return false;
    }

    this.notes = this.metadata.configuration.grant_types_supported;
    return true;
  }
}

module.exports = Test_1_4_2;
