const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_5 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.4.5";
        this.description = "The token_endpoint_auth_methods_supported MUST be ['private_key_jwt']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.token_endpoint_auth_methods_supported == null
            || this.metadata.configuration.token_endpoint_auth_methods_supported == '') {

            this.notes = this.metadata;
            throw "the claim token_endpoint_auth_methods_supported is not present";
            return false;
        }

        if(!(this.metadata.configuration.token_endpoint_auth_methods_supported.length==1
            && this.metadata.configuration.token_endpoint_auth_methods_supported.includes('private_key_jwt')
        )) {
            this.notes = this.metadata.configuration.token_endpoint_auth_methods_supported;
            throw("the token_endpoint_auth_methods_supported is not ['private_key_jwt']");
        }

        this.notes = this.metadata.configuration.token_endpoint_auth_methods_supported;
        return true;

    }

}

module.exports = Test_1_4_5