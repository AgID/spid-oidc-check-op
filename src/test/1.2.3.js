const TestMetadata = require('../server/lib/test/TestMetadata.js');
const axios = require('../server/node_modules/axios');

class Test_1_2_3 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.3';
    this.description =
      'The document MUST be returned as Content-Type application/entity-statement+jwt ';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    let response = await axios.get(this.metadata.url);
    this.notes = response.headers['content-type'];
    if (this.notes != 'application/entity-statement+jwt') {
      throw "Content-Type is not 'application/entity-statement+jwt'";
    } else {
      return true;
    }
  }
}

module.exports = Test_1_2_3;
