const TestMetadata = require("../server/lib/test/TestMetadata.js");
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const axios = require("../server/node_modules/axios");
const jose = require("../server/node_modules/node-jose");
const fs = require("fs");
const private_key = fs.readFileSync(
  __dirname + "/../config/spid-oidc-check-op-enc.key",
  "utf8"
);

class Test_1_2_4 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.4";
    this.description = "The signature of the JWS document MUST be valid";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if(this.metadata.type!='federation') {
      return this.notes = "N/A - downloaded metadata is not of type federation";
    }

    let returnedDocument = this.metadata.entity_statement;

    if (!validator.isJWT(returnedDocument)) {
      this.notes = returnedDocument;
      throw "returned document is not a valid JWT";
    }

    let jwks = this.metadata.configuration.jwks;

    if (jwks.keys == null || jwks.keys == "") {

      if(this.metadata.signed_jwks_uri == null || this.metadata.signed_jwks_uri == '') {
        this.notes = this.metadata.configuration;
        throw "JWKS not found";

      } else {
        // TODO
        //jwks = (await axios.get(this.metadata.configuration.signed_jwks_uri)).data;

        this.notes = this.metadata.signed_jwks_uri;
        throw "test for signed_jwks_uri is not implemented. Please contact AgID. Thanks";
      }
    }

    let keystore = jose.JWK.createKeyStore();

    for (let k in jwks.keys) {
      await keystore.add(jwks.keys[k]);
    }

    let returnedDocumentVerified = await jose.JWS.createVerify(keystore).verify(
      returnedDocument
    );

    this.notes = jwks;

    if (!this.notes) {
      throw "document not verifiable";
    }
  }
}

module.exports = Test_1_2_4;
