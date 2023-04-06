const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');

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
      this.authresponse.error !=
      [
        'access_denied',
        'invalid_client',
        'invalid_request',
        'invalid_scope',
        'server_error',
        'temporary_unavailable',
      ]
    ) {
      this.notes = this.authresponse.error;
      throw 'The value of error is not one of "access_denied", "invalid_client", "invalid_request", "invalid_scope", "server_error", "temporary_unavailable"';
    } else {
      this.notes = this.authresponse.error;
      return true;
    }
  }
}

module.exports = Test_2_5_1;
