const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_2_2 extends TestIntrospectionResponse {
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
    this.num = '5.2.2';
    this.description =
      'Introspection Response:the content of body MUST be a valid JSON';
    this.validation = 'self';
  }
  async exec() {
    this.introspectionrequest.client_id = config_rp.client_id;
    this.introspectionresponse.code = this.authresponse.code;
    this.introspectionresponse.code_verifier = this.authrequest.code_verifier;
    this.introspectionresponse.grant_type = 'authorization_code';
    this.introspectionresponse.client_assertion_type =
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
    this.introspectionresponse.redirect_uri = this.authrequest.redirect_uri;
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
      aud: this.metadata.configuration.token_endpoint,
      iat: iat.unix(),
      exp: exp.unix(),
      sub: this.introspectionrequest.client_id,
    });

    if (payload.isValid()) {
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
    } else {
      throw 'The content of body is not a valid JSON';
    }
  }
}

module.exports = Test_5_2_2;
