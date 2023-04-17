const { access } = require("fs");
const TestAuthResponse = require("../server/lib/test/TestAuthResponse.js");
const Utility = require("../server/lib/utils");

class Test_2_5_1 extends TestAuthResponse {
  errorValuePermissed = [
    "access_denied",
    "invalid_client",
    "invalid_request",
    "invalid_scope",
    "server_error",
    "temporary_unavailable",
  ];
  constructor(metadata, authrequest, authresponse) {
    super(metadata, authrequest, authresponse);
    this.num = "2.5.1";
    this.description =
      'the value of error MUST be one of ["access_denied", "invalid_client", "invalid_request", "invalid_scope", "server_error", "temporary_unavailable"]';
    this.validation = "automatic";
  }

  exec() {
    super.exec();
    if (!this.errorValuePermissed.includes(this.authresponse.error)) {
      throw 'The value of error is not one of "access_denied", "invalid_client", "invalid_request", "invalid_scope", "server_error", "temporary_unavailable"';
    } else {
      this.notes = this.authresponse.error;
      return true;
    }
  }
}

module.exports = Test_2_5_1;
