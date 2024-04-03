const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_29 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.29";
        this.description = "The metadata MUST contain the claim revocation_endpoint_auth_methods_supported";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();

        if(this.metadata.configuration.revocation_endpoint_auth_methods_supported==null
            || this.metadata.configuration.revocation_endpoint_auth_methods_supported=='') {
            this.notes = this.metadata.configuration;
            throw("the claim revocation_endpoint_auth_methods_supported is not present");
        } 

        this.notes = this.metadata.configuration.revocation_endpoint_auth_methods_supported;
        return true;

    }

}

module.exports = Test_1_3_29