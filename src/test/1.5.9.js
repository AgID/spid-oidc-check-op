const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_9 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.9";
        this.description = "If present, the token_endpoint_auth_signing_alg_values_supported  MUST be  ['RS256', 'RS512']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported==null
            || this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported=='') {
            this.notes = this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
            throw("the claim token_endpoint_auth_signing_alg_values_supported is not present");
        } 

        if(!(this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported.length==2
            && this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported.includes('RS256')
            && this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported.includes('RS512')
        )) {
            this.notes = this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
            throw("the claim token_endpoint_auth_signing_alg_values_supported is not ['RS256', 'RS512']");
        }

        this.notes = this.metadata.configuration.token_endpoint_auth_signing_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_9