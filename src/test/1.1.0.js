const TestMetadata = require('../server/lib/test/TestMetadata.js');
const Validator = require('../server/node_modules/validator');

class Test_1_1_0 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.1.0";
        this.description = "Document URL MUST be <issuer>/.well-known/openid-configuration";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        if(
            this.metadata.url==(this.metadata.configuration.issuer + "/.well-known/openid-configuration")
            || this.metadata.url==(this.metadata.configuration.issuer + "/.well-known/openid-configuration/")
        ) {
            this.notes = this.metadata.url;
            return true;
        } else {
            this.notes = this.metadata.url;
            throw("Document URL is not <issuer>/.well-known/openid-configuration");
        }
    }

}

module.exports = Test_1_1_0 