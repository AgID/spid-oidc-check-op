const TestMetadata = require('../server/lib/test/TestMetadata.js');

const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');
const axios = require('../server/node_modules/axios');
const jose = require('../server/node_modules/node-jose');
const fs = require('fs');
const private_key = fs.readFileSync(
  __dirname + '/../config/spid-oidc-check-op-enc.key',
  'utf8'
);

class Test_1_2_4 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.4';
    this.description = 'The signature of the JWS document MUST be valid';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();

    let returnedDocument = this.metadata.entity_statement;

    if (!validator.isJWT(returnedDocument)) {
      this.notes = returnedDocument;
      throw 'returned document is not a valid JWT';
    }

    // let keystore = jose.JWK.createKeyStore();
    // await keystore.add(private_key, 'pem');

    let jwks = (await axios.get(this.metadata.configuration.jwks_uri)).data;

    if (jwks.keys == null || jwks.keys == '') {
      this.notes = jwks;
      throw 'JWKS not found';
    }

    let keystore = await jose.JWK.asKeyStore(jwks.keys);

    console.log(keystore.toString());

    let returnedDocumentVerified = await jose.JWS.createVerify(keystore, {
      algorithms: '*',
    }).verify(returnedDocument);
    let returnedDocumentSig = returnedDocumentVerified.payload.toString();

    if (!validator.isJWT(returnedDocumentSig)) {
      this.notes = returnedDocumentSig;
      throw 'returned document is not a valid JWT';
    }
  }
}

module.exports = Test_1_2_4;
