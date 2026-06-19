const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_8 extends TestIntrospectionResponse {
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
    this.num = '5.2.8';
    this.description =
      'Introspection Response:the value of sub MUST be equal to the value of sub in id_token ';
    this.validation = 'self';
  }
  async exec() {
    if (this.introspectionresponse.sub != this.id_token.sub) {
      throw 'The value of sub is not equal to the value of sub in id_token ';
    } else {
      this.notes = this.introspectionresponse.sub;
      return true;
    }
  }
}

module.exports = Test_5_2_8;
