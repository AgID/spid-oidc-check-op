const TestMetadata = require("../server/lib/test/TestMetadata.js");
const x509 = require("../server/node_modules/@peculiar/x509");

class Test_1_6_1 extends TestMetadata {
  constructor(metadata) {
    super(metadata);
    this.num = "1.6.1";
    this.description = "The x5c SHOULD contain a cert provided by CA AgID";
    this.validation = "self";
  }

  async exec() {
    let jwks = (await axios.get(this.metadata.configuration.jwks_uri)).data;
    for (const x5c of jwk["x5c"]) {
      const cert = new x509.X509Certificate(x5c);
      if (cert.Issuer.commonName == "CA AgID") {
        this.notes = jwks["x5c"];
        return true;
      }
    }
    this.notes =
      "a certificate provided by CA AgID is not present, it's recommended but not mandatory";
    return true;
  }
}

module.exports = Test_1_6_1;
