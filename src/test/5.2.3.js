const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_3 extends TestIntrospectionResponse {
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
    this.num = '5.2.3';
    this.description =
      'Introspection Response:parameter active MUST be present';
    this.validation = 'self';
  }
  async exec() {
    if (
      this.introspectionresponse.active == null ||
      this.introspectionresponse.active == ''
    ) {
      throw 'Parameter active is not present';
    } else {
      this.notes = this.introspectionresponse.active;
      return true;
    }
  }
}
module.exports = Test_5_2_3;
