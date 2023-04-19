const path = require('path');
const TestUserinfoRequest = require('../server/lib/test/TestUserinfoRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');

class Test_4_1_1 extends TestUserinfoRequest {
  constructor(
    metadata,
    authrequest = {},
    authresponse = {},
    tokenrequest = {},
    tokenresponse = {}
  ) {
    super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
    this.num = '4.1.1';
    this.description = 'the bearer token for authorization is not valid';
    this.validation = 'self';
  }

  async exec() {
    super.exec();
    this.notes = this.authresponse.data.access_token;
    if (!validator.isJWT(this.notes))
      throw 'The value of access_token is not a valid JWT';

    return true;
  }
}

module.exports = Test_4_1_1;
