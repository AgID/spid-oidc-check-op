const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_2_10 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.10';
    this.description = 'The document MUST contain the claim exp';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    this.notes = this.metadata.exp;
    if (this.notes == null || this.notes == '')
      throw 'claim exp is not present';

    return true;
  }
}

module.exports = Test_1_2_10;
