const TestUserinfoResponse = require("../server/lib/test/TestUserinfoResponse.js");

class Test_4_5_0 extends TestUserinfoResponse {
  constructor(
    metadata,
    authrequest,
    authresponse,
    tokenrequest,
    tokenresponse,
    refreshtokenrequest,
    refreshtokenresponse,
    userinforequest,
    userinforesponse
  ) {
    super(
      metadata,
      authrequest,
      authresponse,
      tokenrequest,
      tokenresponse,
      refreshtokenrequest,
      refreshtokenresponse,
      userinforequest,
      userinforesponse
    );
    this.num = "4.5.0";
    this.description = "the HTTP error Status Code MUST be one of [400, 401, 403, 405]";
    this.validation = "automatic";
  }
  async exec() {
    super.exec();
    const allowedCode = [400, 401, 403, 405];
    let response = await axios.get(this.userinforesponse.url);
    this.notes = response.status;
    if (!allowedCode.includes(this.notes)) {
      throw `The HTTP Status Code is not ${allowedCode}`;
    }
    return true;
  }
}
module.exports = Test_4_5_0;
