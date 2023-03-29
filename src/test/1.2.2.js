const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');
const utility = require('../server/lib/utils');
const jose = require('../server/node_modules/node-jose');
const fs = require('fs');

class Test_1_2_2 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.2';
    this.description = 'The document MUST be returned as a valid JWS document';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();

    this.notes = this.metadata.entity_statement;

    if (typeof this.notes != 'string')
      throw 'the content the document is not a valid JWT string';

    if (!validator.isJWT(this.notes, true)) throw 'document is not a valid JWT';

    this.notes = jwt_decode(this.notes);

    return true;
  }
}

module.exports = Test_1_2_2;
