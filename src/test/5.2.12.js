const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_12 extends TestIntrospectionResponse {
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
    this.num = '5.2.12';
    this.description =
      'Introspection Response:the value of iss MUST be equal to the URL of the OP';
    this.validation = 'self';
  }
  async exec() {
    if (this.introspectionresponse.iss != this.OP.url) {
      throw 'The value of iss is not equal to the URL of OP ';
    } else {
      this.notes = this.introspectionresponse.active;
      return true;
    }
  }
}

module.exports = Test_5_2_12;
