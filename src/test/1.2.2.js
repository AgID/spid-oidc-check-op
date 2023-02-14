const TestUserinfoResponse = require("../server/lib/test/TestUserinfoResponse.js");
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const utility = require("../server/lib/utils");
const jose = require("../server/node_modules/node-jose");
const fs = require("fs");
const private_key = fs.readFileSync(
  __dirname + "/../config/spid-oidc-check-op-enc.key",
  "utf8"
);

class Test_1_2_2 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.2";
    this.description = "The document MUST be returned as a valid JWS document";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    let returnedDocument = this.metadata.data;

    if (typeof this.metadata.data != "string") {
      this.notes = this.metadata.data;
      throw "the content the document is not a valid JWT string";
    }

    if (!utility.isJWT(returnedDocument, true)) {
      this.notes = returnedDocument;
      throw "document is not a valid JWT";
    }

    let keystore = jose.JWK.createKeyStore();
    await keystore.add(private_key, "pem");
    let document_sig_token_obj = await jose.JWE.createDecrypt(keystore).decrypt(
      returnedDocument
    );
    let document_sig_token = document_sig_token_obj.payload.toString();

    if (!validator.isJWT(document_sig_token)) {
      this.notes = document_sig_token;
      throw "document data is not a valid JWT";
    }

    this.notes = document_sig_token;
    return true;
  }
}

module.exports = Test_1_2_2;
