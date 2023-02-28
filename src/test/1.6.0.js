const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_6_0 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = '1.6.0';
    this.description = 'The jwks SHOULD contain x5c';
    this.validation = 'automatic';
  }

  async exec() {
    super.exec();

    let jwks;
    if (!this.metadata.configuration.jwks.keys.some((key) => key.x5c)) {
      jwks = (await axios.get(this.metadata.configuration.jwks_uri)).data;
      if (!jwks.keys.includes('x5c')) {
        this.notes = "x5c is not present, it's recommended but not mandatory";
        return true;
      }
    } else {
      this.notes = this.metadata.configuration.jwks.keys;
      return true;
    }

    this.notes = 'x5c=' + jwks['x5c'];
    return true;
  }
}

module.exports = Test_1_6_0;
