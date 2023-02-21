const { throws } = require('assert');
const TestTokenRequest = require('../server/lib/test/TestTokenRequest.js');

class Test_3_1_0 extends TestTokenRequest {
  constructor(metadata, authrequest = {}, authresponse = {}, tokenrequest) {
    super(metadata, authrequest, authresponse, tokenrequest);
    this.num = '3.1.0';
    this.description = 'token request is sent using HTTP GET method';
    this.validation = 'automatic';
  }
  async exec() {
    super.exec();
    this.notes = this.tokenrequest.method;
    if (this.notes !== 'GET')
      throw 'token request is not using HTTP GET method';

    return true;
  }
}

module.exports = Test_3_1_0;
