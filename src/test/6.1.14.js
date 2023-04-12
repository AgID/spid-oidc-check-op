const TestRevocationRequest = require('../server/lib/test/TestIntrospectionResponse.js');
const fs = require('fs');
const path = require('path');
const moment = require('../server/node_modules/moment');
const jose = require('../server/node_modules/node-jose');
const Utility = require('../server/lib/utils.js');

class Test_6_1_14 extends TestRevocationRequest {
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
    this.num = '6.1.14';
    this.description = 'the value of exp is not a valid unix time';
    this.validation = 'self';
  }
  async exec() {
    this.revocationrequest.client_id = config_rp.client_id;
    this.revocationrequest.code = this.authresponse.code;
    this.revocationrequest.code_verifier = this.authrequest.code_verifier;
    this.revocationrequest.grant_type = 'authorization_code';
    this.revocationrequest.client_assertion =
      this.tokenrequest.client_assertion;
    this.revocationrequest.client_assertion_type =
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
    this.revocationrequest.redirect_uri = this.authrequest.redirect_uri;

    const config_key = fs.readFileSync(
      path.resolve(__dirname, '../config/spid-oidc-check-op-sig.key')
    );
    const keystore = jose.JWK.createKeyStore();

    let key = await keystore.add(config_key, 'pem');

    let header = {};

    let iat = moment();
    let exp = '';

    let payload = JSON.stringify({
      jti: Utility.getUUID(),
      iss: this.revocationrequest.client_id,
      aud: this.metadata.configuration.token_endpoint,
      iat: iat.unix(),
      exp: exp.unix(),
      sub: this.revocationrequest.client_id,
    });

    this.revocationrequest.client_assertion = await jose.JWS.createSign(
      {
        format: 'compact',
        alg: 'RS256',
        fields: { ...header },
      },
      key
    )
      .update(payload)
      .final();
  }
}

module.exports = Test_6_1_14;
