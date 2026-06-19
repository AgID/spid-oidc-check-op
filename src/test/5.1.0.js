const TestIntrospectionRequest = require('../server/lib/test/TestIntrospectionRequest.js');
const moment = require('../server/node_modules/moment');

class Test_5_1_0 extends TestIntrospectionRequest {
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
    this.num = '5.1.0';
    this.description =
      'Wrong Introspection Request: the request is sent using HTTP method different from POST';
    this.validation = 'self';
  }
  async exec() {
    this.notes = this.introspectionrequest.method;
    if (this.notes != 'POST') {
      throw 'introspection request is sent using HTTP method different from POST';
    }
    return true;
  }
}

module.exports = Test_5_1_0;
