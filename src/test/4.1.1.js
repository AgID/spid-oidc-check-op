const TestUserinfoRequest = require("../server/lib/test/TestUserinfoRequest.js");

class Test_4_1_1 extends TestUserinfoRequest {
  constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest) {
    super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest);
    this.num = "4.1.1";
    this.description = "the bearer token for authorization is not valid";
    this.validation = "self";
  }

  async exec() {
    super.exec();
    this.notes = this.authresponse.data.access_token;
    if (!validator.isJWT(this.notes)) {
      throw "The bearer token for authorization is not valid";
    }

    return true;
  }
}

module.exports = Test_4_1_1;
