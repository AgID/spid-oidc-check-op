const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_13 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.13";
        this.description = "The userinfo_encryption_alg_values_supported MUST NOT contain ['RSA_1_5']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.userinfo_encryption_alg_values_supported==null
            || this.metadata.configuration.userinfo_encryption_alg_values_supported=='') {
            this.notes = this.metadata.configuration.userinfo_encryption_alg_values_supported;
            throw("the claim userinfo_encryption_alg_values_supported is not present");
        } 

        if(this.metadata.configuration.userinfo_encryption_alg_values_supported.includes('RSA_1_5')) {
            this.notes = this.metadata.configuration.userinfo_encryption_alg_values_supported;
            throw("the claim userinfo_encryption_alg_values_supported must not contain 'RSA_1_5'");
        }

        this.notes = this.metadata.configuration.userinfo_encryption_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_13