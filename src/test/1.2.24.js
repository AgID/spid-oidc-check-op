const TestMetadata = require('../server/lib/test/TestMetadata.js');
const jwt_decode = require('../server/node_modules/jwt-decode');
const validator = require('../server/node_modules/validator');

class Test_1_2_24 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.2.24';
    this.description = 'The array contacts MUST contain at least one contact in the form of a valid email address';
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

    let valid = false;
    for(let contact of metadata.federation_entity.contacts) {
        valid = valid || validator.isEmail(contact);
    }
    
    if (!valid) {
      this.notes = metadata.federation_entity.contacts;
      throw 'The array contacts does not contains any contact in the form of a valid email address';
    }

    this.notes = metadata.federation_entity.contacts;
    return true;
  }
}

module.exports = Test_1_2_24;
