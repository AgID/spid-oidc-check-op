const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_4 extends TestIntrospectionResponse {
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
    this.num = '5.2.4';
    this.description =
      "Introspection Response:parameter active MUST be 'true' or 'false'";
    this.validation = 'self';
  }
  async exec() {
    if (['true', 'false'].includes(this.introspectionresponse.active)) {
      throw 'Parameter active MUST contain only "true" or "false"';
    } else {
      this.notes = this.introspectionresponse.active;
      return true;
    }
  }
}

module.exports = Test_5_2_4;
