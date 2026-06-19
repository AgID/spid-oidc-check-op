const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_11 extends TestIntrospectionResponse {
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
    this.num = '5.2.11';
    this.description =
      'Introspection Response:if active=true, parameter iss MUST be present ';
    this.validation = 'self';
  }
  async exec() {
    if (this.introspectionresponse.active == 'true') {
      if (
        this.introspectionresponse.iss == null ||
        this.introspectionresponse.iss == ''
      ) {
        throw 'Parameter iss is not present';
      } else {
        this.notes = this.introspectionresponse.iss;
        return true;
      }
    } else {
      this.notes = this.introspectionresponse.active;
      return true;
    }
  }
}
module.exports = Test_5_2_11;
