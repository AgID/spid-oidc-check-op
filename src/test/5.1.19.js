const TestIntrospectionRequest = require('../server/lib/test/TestIntrospectionRequest.js');

class Test_5_1_19 extends TestIntrospectionRequest {
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
    this.num = '5.1.19';
    this.description =
      "Wrong Introspection Request:the value of client_assertion_type is different from 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'";
    this.validation = 'self';
  }
  async exec() {
    //this.tokenrequest.client_id = "";
    this.introspectionrequest.code = this.authresponse.code;
    this.introspectionrequest.code_verifier = this.authrequest.code_verifier;
    this.introspectionrequest.grant_type = 'authorization_code';
    this.introspectionrequest.client_assertion_type =
      'urn:ietf:params:oauth:client-assertion-type:jwt-bearer';
    this.introspectionrequest.redirect_uri = this.authrequest.redirect_uri;

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

module.exports = Test_5_1_19;
