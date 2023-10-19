const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_3 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.3";
        this.description = "The userinfo_signing_alg_values_supported MUST contain ['RS256', 'RS512']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.userinfo_signing_alg_values_supported==null
            || this.metadata.configuration.userinfo_signing_alg_values_supported=='') {
            this.notes = this.metadata.configuration.userinfo_signing_alg_values_supported;
            throw("the claim userinfo_signing_alg_values_supported is not present");
        } 

        if(!this.metadata.configuration.userinfo_signing_alg_values_supported.includes('RS256')) {
            this.notes = this.metadata.configuration.userinfo_signing_alg_values_supported;
            throw("the claim userinfo_signing_alg_values_supported does not contain 'RS256'");
        }

        if(!this.metadata.configuration.userinfo_signing_alg_values_supported.includes('RS512')) {
            this.notes = this.metadata.configuration.userinfo_signing_alg_values_supported;
            throw("the claim userinfo_signing_alg_values_supported does not contain 'RS512'");
        }

        this.notes = this.metadata.configuration.userinfo_signing_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_3