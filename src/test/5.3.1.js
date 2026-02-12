const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_3_1 extends TestIntrospectionResponse {
  constructor(
    metadata,
    authrequest,
    authresponse,
    tokenrequest,
    tokenresponse,
    refreshtokenrequest,
    refreshtokenresponse,
    userinforequest,
    userinforesponse,
    introspectionrequest,
    introspectionresponse
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
      userinforesponse,
      introspectionrequest,
      introspectionresponse
    );
    this.num = '5.3.1';
    this.description =
      'Introspection Error Response: the HTTP Status Code MUST be one of [401, 405]';
    this.validation = 'self';
  }
  async exec() {
    super.exec();
    const allowedCode = [401, 405];
    let response = await axios.get(this.introspectionresponse.url);
    this.notes = response.status;
    if (!allowedCode.includes(this.notes)) {
      throw `The HTTP Status Code is not ${allowedCode}`;
    }
    return true;
  }
}

module.exports = Test_5_3_1;
