const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_20 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.20';
    this.description = 'The federation_entity MUST contain the claim logo_uri';
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

    if (metadata.federation_entity.logo_uri == null || metadata.federation_entity.logo_uri == '') {
      this.notes = metadata.federation_entity;
      throw 'the federation_entity metadata does not contains the claim logo_uri';
    }
    
    this.notes = metadata.federation_entity.logo_uri;
    return true;
  }
}

module.exports = Test_1_2_20;
