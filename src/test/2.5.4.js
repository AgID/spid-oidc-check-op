const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');

class Test_2_5_4 extends TestAuthResponse {
  constructor(metadata, authrequest, authresponse) {
    super(metadata, authrequest, authresponse);
    this.num = '2.5.4';
    this.description =
      'the value of state MUST be the same sent with the request';
    this.validation = 'automatic';
  }

  exec() {
    super.exec();
    if (this.authresponse.state != this.authrequest.state) {
      this.notes = this.authresponse.state;
      throw 'The value of state is different from the value of state sent with the request';
    } else {
      this.notes = this.authresponse.state;
      return true;
    }
  }
}

module.exports = Test_2_5_4;
