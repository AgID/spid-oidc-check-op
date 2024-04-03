const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');

class Test_2_5_0 extends TestAuthResponse {
  constructor(metadata, authrequest, authresponse) {
    super(metadata, authrequest, authresponse);
    this.num = '2.5.0';
    this.description = 'parameter error MUST be present';
    this.validation = 'automatic';
  }

  exec() {
    super.exec();
    if (this.authresponse.error == null || this.authresponse == '') {
      throw 'Parameter error is not present';
    } else {
      this.notes = this.authresponse.error;
      return true;
    }
  }
}

module.exports = Test_2_5_0;
