const TestUserinfoResponse = require("../server/lib/test/TestUserinfoResponse.js");
const utility = require("../server/lib/utils");
const jose = require("../server/node_modules/node-jose");
const fs = require("fs");
const private_key = fs.readFileSync(__dirname + "/../config/spid-oidc-check-op-enc.key", "utf8");

class Test_4_3_6 extends TestUserinfoResponse {
  constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
    super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
    this.num = "4.3.6";
    this.description =
      "Userinfo Encrypted Token Payload: The Userinfo Response Encrypted Token MUST be able to be decrypted with the private key of the RP";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    let userinfo_token = this.userinforesponse.data;

    if (typeof userinfo_token != "string") {
      this.notes = userinfo_token;
      throw "the content of body is not a valid JWT string";
    }

    if (!utility.isJWT(userinfo_token, true)) {
      this.notes = userinfo_token;
      throw "userinfo data is not a valid JWT";
    }

    let keystore = jose.JWK.createKeyStore();
    await keystore.add(private_key, "pem");
    let decrypted_userinfo = await jose.JWE.createDecrypt(keystore).decrypt(userinfo_token);
    let userinfo_sig_token = decrypted_userinfo.payload.toString();

    if (!utility.isString(userinfo_sig_token)) {
      this.notes = userinfo_sig_token;
      throw "userinfo signed token is not a valid string";
    }

    if (!utility.isJWT(userinfo_sig_token, false)) {
      this.notes = userinfo_sig_token;
      throw "userinfo signed token is not a valid JWT";
    }

    this.notes = userinfo_sig_token;
    return true;
  }
}

module.exports = Test_4_3_6;
