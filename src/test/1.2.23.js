const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');

class Test_1_2_23 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.23';
    this.description = 'The value of contacts MUST be a valid array';
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

    if (metadata.federation_entity.contacts == null || metadata.federation_entity.contacts == '') {
      this.notes = metadata.federation_entity;
      throw 'the federation_entity metadata does not contains the claim contacts';
    }

    if (!Array.isArray(metadata.federation_entity.contacts)) {
      this.notes = metadata.federation_entity.contacts;
      throw 'The value of contacts is not a valid JSON array';
    }
    
    this.notes = metadata.federation_entity.contacts;
    return true;
  }
}

module.exports = Test_1_2_23;
