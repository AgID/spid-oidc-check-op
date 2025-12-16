const { access } = require("fs");
const TestAuthResponse = require("../server/lib/test/TestAuthResponse.js");
const Utility = require("../server/lib/utils");

class Test_2_5_1 extends TestAuthResponse {
  errorValuePermissed = [
    "access_denied",
    "invalid_client",
    "unauthorized_client",
    "invalid_request",
    "invalid_scope",
    "server_error",
    "temporary_unavailable",
    "unsupported_response_type",
    "login_required",
    "consent_required",
    "request_uri_not_supported",
    "registration_not_supported",
    "invalid_request_object"
  ];

  constructor(metadata, authrequest, authresponse) {
    super(metadata, authrequest, authresponse);
    this.num = "2.5.1";
    this.description =
      'the value of error MUST be one of ' + JSON.stringify(this.errorValuePermissed, null, 3);
    this.validation = "automatic";
  }

  exec() {
    super.exec();
    if (!this.errorValuePermissed.includes(this.authresponse.error)) {
      throw 'The value of error is not one of ' + JSON.stringify(this.errorValuePermissed, null, 3);
    } else {
      this.notes = this.authresponse.error;
      return true;
    }
  }
}

module.exports = Test_2_5_1;
