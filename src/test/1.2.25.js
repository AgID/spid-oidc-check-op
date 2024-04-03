const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_2_25 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.25';
    this.description = 'The federation_entity MUST contain the claim federation_resolve_endpoint';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();
    if(this.metadata.type!='federation') {
      this.notes = "Metadata is not provided as openid-federation";
      return false;
    }
    
    let metadata = jwt_decode(this.metadata.entity_statement).metadata;
    if (metadata == null || metadata == '') {
      this.notes = metadata;
      throw 'claim metadata is not present';
    }

    if (metadata.federation_entity == null || metadata.federation_entity == '') {
      this.notes = metadata;
      throw 'the federation_entity metadata is not present';
    }

    if (metadata.federation_entity.federation_resolve_endpoint == null || metadata.federation_entity.federation_resolve_endpoint == '') {
      this.notes = metadata.federation_entity;
      throw 'the federation_entity metadata does not contains the claim federation_resolve_endpoint';
    }

    this.notes = metadata.federation_entity.federation_resolve_endpoint;
    return true;
  }
}

module.exports = Test_1_2_25;
