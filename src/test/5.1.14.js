const TestIntrospectionRequest = require('../server/lib/test/TestIntrospectionRequest.js');
const moment = require('../server/node_modules/moment');

class Test_5_1_14 extends TestIntrospectionRequest {
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
    this.num = '5.1.14';
    this.description =
      'Wrong Introspection Request:the value of exp is not a valid unix time';
    this.validation = 'self';
  }
  async exec() {
    this.introspectionrequest.client_id = config_rp.client_id;
    this.introspectionrequest.code = this.authresponse.code;
    this.introspectionrequest.code_verifier = this.authrequest.code_verifier;
    this.introspectionrequest.grant_type = 'authorization_code';
    this.introspectionrequest.client_assertion_type =
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
    this.introspectionrequest.redirect_uri = this.authrequest.redirect_uri;
    this.introspectionrequest.endpoint =
      this.metadata.configuration.introspection_endpoint;
    const config_key = fs.readFileSync(
      path.resolve(__dirname, '../config/spid-oidc-check-op-sig.key')
    );
    const keystore = jose.JWK.createKeyStore();

    let key = await keystore.add(config_key, 'pem');

    let header = {};

    let iat = moment();
    let exp = iat.clone().add(15, 'm');

    let payload = JSON.stringify({
      jti: Utility.getUUID(),
      iss: this.introspectionrequest.client_id,
      aud: this.metadata.configuration.introspection_endpoint,
      iat: iat.unix(),
      exp: exp,
      sub: this.introspectionrequest.client_id,
    });

    this.introspectionrequest.client_assertion = await jose.JWS.createSign(
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

module.exports = Test_5_1_14;
