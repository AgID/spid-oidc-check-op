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

    let returnedDocument = this.metadata.data;

    if (!validator.isJWT(returnedDocument)) {
      this.notes = returnedDocument;
      throw 'returned document is not a valid JWT';
    }

    let keystore = jose.JWK.createKeyStore();
    await keystore.add(private_key, 'pem');
    let returnedDocumentSigObj = await jose.JWE.createDecrypt(keystore).decrypt(
      returnedDocument
    );
    let returnedDocumentSig = returnedDocumentSigObj.payload.toString();

    if (!validator.isJWT(returnedDocumentSig)) {
      this.notes = returnedDocumentSig;
      throw 'returned document is not a valid JWT';
    }
  }
}

module.exports = Test_1_2_4;
