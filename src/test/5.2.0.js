const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_0 extends TestIntrospectionResponse {
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
    this.num = '5.2.0';
    this.description =
      "Introspection Response: response MUST have Content-Type 'application/json'";
    this.validation = 'self';
  }
  async exec() {
    super.exec();
    if (
      !this.introspectionresponse.headers['content-type'].includes(
        'application/json'
      )
    ) {
      this.notes = this.introspectionresponse.headers['content-type'];
      throw "Content-Type is not 'application/json'";
    } else {
      this.notes = this.introspectionresponse.headers['content-type'];
      return true;
    }
  }
}

module.exports = Test_5_2_0;
