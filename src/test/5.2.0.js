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
    this.description = "response MUST have Content-Type 'application/json";
    this.validation = 'automatic';
  }
  async exec() {
    super.exec();
    this.notes = this.introspectionresponse.headers['content-type'];
    if (!this.notes.includes('application/json'))
      throw "Content-Type is not 'application/json'";
    return true;
  }
}
module.exports = Test_5_2_0;
