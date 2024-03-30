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

        if(this.metadata.type=='federation') {

            this.notes = "N/A - metadata is provided as openid-federation";
            return true;

        } else {

            let issuer = this.metadata.configuration.issuer;
            if(issuer.substring(issuer.length-1)=='/') {
                issuer = issuer.substring(0, issuer.length-1);
            }

            if(
                this.metadata.url==(issuer + "/.well-known/openid-configuration")
                || this.metadata.url==(issuer + "/.well-known/openid-configuration/")
            ) {
                this.notes = issuer + "/.well-known/openid-configuration";
                return true;
            } else {
                this.notes = this.metadata.url + " != " + issuer + "/.well-known/openid-configuration";
                throw("Document URL is not <issuer>/.well-known/openid-configuration");
            }
        
        }
    }

}

module.exports = Test_1_1_0 