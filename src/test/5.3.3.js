const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_3_3 extends TestIntrospectionResponse {
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
    this.num = '5.3.3';
    this.description =
      'Introspection Error Response:parameter error_description MUST be present';
    this.validation = 'self';
  }
  async exec() {
    if (
      this.introspectionresponse.error_description == null ||
      this.introspectionresponse.error_description == ''
    ) {
      throw 'Parameter error_description is not present';
    } else {
      this.notes = this.introspectionresponse.error_description;
      return true;
    }
  }
}

module.exports = Test_5_3_3;
