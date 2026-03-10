const TestRevocationRequest = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_6_1_0 extends TestRevocationRequest {
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
    introspectionresponse,
    revocationrequest,
    revocationresponse
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
      introspectionresponse,
      revocationrequest,
      revocationresponse
    );
    this.num = '6.1.0';
    this.description =
      'the request is sent using HTTP method different from POST';
    this.validation = 'automatic';
  }
  async exec() {
    super.exec();
    this.notes = this.revocationrequest.method;
    if (this.notes !== 'POST')
      throw 'token request is not using HTTP POST method';

    return true;
  }
}
module.exports = Test_6_1_0;
