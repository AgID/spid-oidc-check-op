const TestMetadata = require('../server/lib/test/TestMetadata.js');
const axios = require('../server/node_modules/axios');

class Test_1_2_1 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.1';
    this.description = 'The response MUST return HTTP Status Code 200 OK';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    let response = await axios.get(this.metadata.url);

    if (response.status != 200) {
      this.notes = response.data.status;
      throw 'The HTTP Status Code is not 200 OK';
    } else {
      return true;
    }
  }
}

module.exports = Test_1_2_1;
