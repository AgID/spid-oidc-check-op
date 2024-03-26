const TestUserinfoResponse = require("../server/lib/test/TestUserinfoResponse.js");
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const utility = require("../server/lib/utils");
const jose = require("../server/node_modules/node-jose");
const fs = require("fs");
const private_key = fs.readFileSync(__dirname + "/../config/spid-oidc-check-op-enc.key", "utf8");

class Test_4_4_16 extends TestUserinfoResponse {
  constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
    super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
    this.num = "4.4.16";
    this.description =
      "Userinfo Signed Token Payload: the value of sub MUST be equal to the value of sub in the id_token";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if (!this.tokenresponse.data.id_token) {
      this.notes = this.tokenresponse.data;
      throw "Parameter id_token is not present";
    }

    let id_token_payload = jwt_decode(this.tokenresponse.data.id_token);

    if (id_token_payload.sub == null || id_token_payload.sub == "") {
      this.notes = id_token_payload;
      throw "claim sub in the id_token is not present";
    }

    let userinfo_token = this.userinforesponse.data;

    if (typeof this.userinforesponse.data != "string") {
      this.notes = this.userinforesponse.data;
      throw "the content of body is not a valid JWT string";
    }

    if (!utility.isJWT(userinfo_token, true)) {
      this.notes = userinfo_token;
      throw "userinfo data is not a valid JWT";
    }

    let keystore_rp = jose.JWK.createKeyStore();
    await keystore_rp.add(private_key, "pem");
    let userinfo_sig_token_obj = await jose.JWE.createDecrypt(keystore_rp).decrypt(userinfo_token);
    let userinfo_sig_token = userinfo_sig_token_obj.payload.toString();

    if (!validator.isJWT(userinfo_sig_token)) {
      this.notes = userinfo_sig_token;
      throw "userinfo data is not a valid JWT";
    }

    // I Relying Party (RP) devono usare jwks o signed_jwks_uri (Avv. SPID n.41 v.2)

    if (!this.metadata.configuration.jwks && !this.metadata.configuration.signed_jwks_uri) {
      this.notes = this.metadata.configuration;
      throw "neither jwks or signed_jwks_uri is present";
    }

    let op_jwks = this.metadata.configuration.jwks;

    if (!op_jwks) {
      //let op_signed_jwks = (await axios.get(this.metadata.configuration.signed_jwks_uri)).data;
      this.notes = "signed_jwks_uri is not yet implemented. Please refer to AgID.";
      throw "OP uses signed_jwks_uri";
    }

    if (op_jwks.keys == null || op_jwks.keys == "") {
      this.notes = op_jwks;
      throw "JWKS of OP not found";
    }

    let keystore_op = jose.JWK.createKeyStore();
    for (let k in op_jwks.keys) {
      await keystore_op.add(op_jwks.keys[k], "json");
    }

    let userinfo_sig_token_verified = await jose.JWS.createVerify(keystore_op).verify(userinfo_sig_token);
    userinfo_sig_token_verified.payload = JSON.parse(userinfo_sig_token_verified.payload.toString());

    if (userinfo_sig_token_verified.payload.sub == null || userinfo_sig_token_verified.payload.sub == "") {
      this.notes = userinfo_sig_token_verified.payload;
      throw "claim sub is not present";
    }

    if (userinfo_sig_token_verified.payload.sub != id_token_payload.sub) {
      this.notes = id_token_payload.sub;
      throw "the value of sub is not equal to the value of sub in the id_token";
    }

    this.notes = userinfo_sig_token_verified.payload.sub;

    return true;
  }
}

module.exports = Test_4_4_16;
