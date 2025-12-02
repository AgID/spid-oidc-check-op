const TestMetadata = require("../server/lib/test/TestMetadata.js");
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const axios = require("../server/node_modules/axios").default;
const jose = require("../server/node_modules/node-jose");
const fs = require("fs");
const config_rp = require('../config/rp.json');
const private_key = fs.readFileSync(
  __dirname + "/../config/spid-oidc-check-op-enc.key",
  "utf8"
);

class Test_1_2_29 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.2.29";
    this.description = "The signature of TM with role OP MUST be valid";
    this.validation = "automatic";
  }

  async exec() {
    super.exec();

    if(this.metadata.type!='federation') {
      this.notes = "Metadata is not provided as openid-federation";
      return false;
    }

    let registry_jwks = null;

    // get jwk from registry
    let registry_entity_statement = (await axios.get(config_rp.trust_anchor + '/.well-known/openid-federation')).data;
    let registry_config = jwt_decode(registry_entity_statement);

    registry_jwks = registry_config.jwks;

    if (registry_jwks.keys == null || registry_jwks.keys == "") {
        throw "SPID registry JWKS not found";
    }

    let keystore = jose.JWK.createKeyStore();
    for (let k in registry_jwks.keys) {
      await keystore.add(registry_jwks.keys[k]);
    }

    let entity_statement = jwt_decode(this.metadata.entity_statement);

    for(let tm of entity_statement.trust_marks) {
      if(tm.id==config_rp.trust_anchor + '/openid_provider/private/') {

        let result = await jose.JWS.createVerify(keystore).verify(tm.trust_mark)
        this.notes = result;
        return true;
      }
    }
  }
}

module.exports = Test_1_2_29;
