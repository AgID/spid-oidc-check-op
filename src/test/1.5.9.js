const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_9 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.9";
        this.description = "If present, the token_endpoint_auth_signing_alg_values_supported  MUST contain ['RS256', 'RS512']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported==null
            || this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported=='') {
            //this.notes = this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
            //throw("the claim token_endpoint_auth_signing_alg_values_supported is not present");

            this.notes = "the claim token_endpoint_auth_signing_alg_values_supported is not present, it's recommended but not mandatory";
            return true;
        } 

        if(!this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported.includes('RS256')) {
            this.notes = this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
            throw("the claim token_endpoint_auth_signing_alg_values_supported does not contain 'RS256'");
        }

        if(!this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported.includes('RS512')) {
            this.notes = this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
            throw("the claim token_endpoint_auth_signing_alg_values_supported does not contain 'RS512'");
        }

        this.notes = this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_9