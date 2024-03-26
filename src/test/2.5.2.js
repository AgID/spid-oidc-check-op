const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');

class Test_2_5_2 extends TestAuthResponse {
  constructor(metadata, authrequest, authresponse) {
    super(metadata, authrequest, authresponse);
    this.num = '2.5.2';
    this.description = 'parameter error_description MUST be present';
    this.validation = 'automatic';
  }

  exec() {
    super.exec();
    if (
      this.authresponse.error_description == null ||
      this.authresponse == ''
    ) {
      throw 'Parameter error_description is not present';
    } else {
      this.notes = this.authresponse.error_description;
      return true;
    }
  }
}

module.exports = Test_2_5_2;
