const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_3_2 extends TestIntrospectionResponse {
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
    this.num = '5.3.2';
    this.description =
      'Introspection Error Response:parameter error MUST be present';
    this.validation = 'self';
  }
  async exec() {
    if (
      this.introspectionresponse.error == null ||
      this.introspectionresponse.error == ''
    ) {
      throw 'Parameter error is not present';
    } else {
      this.notes = this.introspectionresponse.error;
      return true;
    }
  }
}

module.exports = Test_5_3_2;
