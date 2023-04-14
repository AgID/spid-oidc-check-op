const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');
const Utility = require('../server/lib/utils');

class Test_2_5_1 extends TestAuthResponse {
  constructor(metadata, authrequest, authresponse) {
    super(metadata, authrequest, authresponse);
    this.num = '2.5.1';
    this.description =
      'the value of error MUST be one of ["access_denied", "invalid_client", "invalid_request", "invalid_scope", "server_error", "temporary_unavailable"]';
    this.validation = 'automatic';
  }

  exec() {
    super.exec();
    if (
      this.authresponse.error.toString() != 'access_denied' ||
      this.authresponse.error.toString() != 'invalid_client' ||
      this.authresponse.error.toString() != 'invalid_request' ||
      this.authresponse.error.toString() != 'invalid_scope' ||
      this.authresponse.error.toString() != 'server_error' ||
      this.authresponse.error.toString() != 'temporary_unavailable'
    ) {
      this.notes = this.authresponse.error;
      return true;
    } else {
      this.notes = this.authresponse.error;
      throw 'The value of error is not one of "access_denied", "invalid_client", "invalid_request", "invalid_scope", "server_error", "temporary_unavailable"';
    }
  }
}

module.exports = Test_2_5_1;
