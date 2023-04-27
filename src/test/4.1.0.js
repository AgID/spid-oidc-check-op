const TestUserinfoRequest = require("../server/lib/test/TestUserinfoRequest.js");

class Test_4_1_0 extends TestUserinfoRequest {
  constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest) {
    super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest);
    this.num = "4.1.0";
    this.description = "the request is sent using HTTP method different from GET";
    this.validation = "self";
  }

  async exec() {
    super.exec();
    this.notes = this.userinforequest.method;
    if (this.notes != "GET") {
      throw "request is not using HTTP GET method";
    }
    return true;
  }
}

module.exports = Test_4_1_0;
