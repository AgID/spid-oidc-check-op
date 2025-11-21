const fs = require("fs");
const path = require("path");
const moment = require("../server/node_modules/moment");
const jose = require("../server/node_modules/node-jose");
const TestRefreshTokenRequest = require("../server/lib/test/TestRefreshTokenRequest.js");
const Utility = require("../server/lib/utils.js");
const config_rp = require("../config/rp.json");

class Test_3_1_36 extends TestRefreshTokenRequest {
  constructor(metadata, authrequest = {}, authresponse = {}, tokenrequest={}, tokenresponse={}, refreshtokenrequest={}) {
    super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest);
    this.num = "3.1.36";
    this.description = "Wrong Token Request: unsupported grant_type";
    this.validation = "self";
  }

  async exec() {
    this.refreshtokenrequest.client_id = config_rp.client_id;
    this.refreshtokenrequest.refresh_token = this.tokenresponse.refresh_token;
    this.refreshtokenrequest.grant_type = "unsupported_grant_type"; //"refresh_token";
    this.refreshtokenrequest.client_assertion_type = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
    this.refreshtokenrequest.redirect_uri = this.authrequest.redirect_uri;

    const config_key = fs.readFileSync(path.resolve(__dirname, "../config/spid-oidc-check-op-sig.key"));
    const keystore = jose.JWK.createKeyStore();

    let key = await keystore.add(config_key, "pem");

    let header = {};

    let iat = moment();
    let exp = iat.clone().add(15, "m");

    let payload = JSON.stringify({
      jti: Utility.getUUID(),
      iss: this.tokenrequest.client_id,
      aud: this.metadata.configuration.token_endpoint,
      iat: iat.unix(),
      exp: exp.unix(),
      sub: this.tokenrequest.client_id,
    });

    this.refreshtokenrequest.client_assertion = await jose.JWS.createSign(
      {
        format: "compact",
        alg: "RS256",
        fields: { ...header },
      },
      key
    )
      .update(payload)
      .final();
  }
}

module.exports = Test_3_1_36;
