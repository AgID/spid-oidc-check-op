const TestUserinfoRequest = require("../server/lib/test/TestUserinfoRequest.js");

class Test_4_1_2 extends TestUserinfoRequest {
  constructor(
    metadata,
    authrequest,
    authresponse,
    tokenrequest,
    tokenresponse,
    refreshtokenrequest,
    refreshtokenresponse,
    userinforequest
  ) {
    super(
      metadata,
      authrequest,
      authresponse,
      tokenrequest,
      tokenresponse,
      refreshtokenrequest,
      refreshtokenresponse,
      userinforequest
    );
    this.num = "4.1.2";
    this.description = "the bearer token for authorization is expired or revoked";
    this.validation = "self";
  }

  async exec() {
    super.exec();
    this.notes = this.tokenresponse.data.access_token;

    if (
      this.tokenresponse.data.error_description &&
      ["revoked", "expired"].includes(this.tokenresponse.data.error_description)
    ) {
      throw "Bearer token is expired or revoked";
    }
    return true;
  }
}

module.exports = Test_4_1_2;
