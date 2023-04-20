const TestUserinfoRequest = require("../server/lib/test/TestUserinfoRequest.js");

class Test_4_1_2 extends TestUserinfoRequest {
  constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest) {
    super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest);
    this.num = "4.1.2";
    this.description = "the bearer token for authorization is expired or revoked";
    this.validation = "self";
  }

  async exec() {
    super.exec();
    this.userinforequest = {
      Authorization: "Bearer " + this.tokenresponse.data.access_token,
    };
  }
}

module.exports = Test_4_1_2;
