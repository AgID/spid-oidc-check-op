const TestUserinfoRequest = require("../server/lib/test/TestUserinfoRequest.js");

class Test_4_1_2 extends TestUserinfoRequest {
  constructor(metadata, authrequest = {}) {
    super(metadata, authrequest);
    this.num = "4.1.2";
    this.description =
      "the bearer token for authorization is expired or revoked";
    this.validation = "self";
  }

  async exec() {
    super.exec();
    //serve db o qualcosa a cui riferirsi per trovare quando il token è stato generato o se è revocato.
  }
}

module.exports = Test_4_1_2;
