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
    this.num = '6.0.0';
    this.description = 'correct request';
    this.validation = 'self';
  }
  async exec() {
    super.exec();
    this.revocationrequest = {
      Authorization: 'Bearer ' + this.tokenresponse.data.access_token,
    };
  }
}
module.exports = Test_6_1_0;
