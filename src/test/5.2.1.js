const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_1 extends TestIntrospectionResponse {
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
    this.num = '5.2.1';
    this.description = 'response MUST have HTTP Status Code 200 OK';
    this.validation = 'automatic';
  }
  async exec() {
    super.exec();
    this.notes = this.introspectionresponse.status;
    if (this.notes != 200) throw 'HTTP Status Code is different from 200 OK';
    return true;
  }
}
module.exports = Test_5_2_1;
