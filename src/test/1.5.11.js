const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_11 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.11";
        this.description = "If present, the id_token_encryption_alg_values_supported MUST NOT contain ['RSA_1_5']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.id_token_encryption_alg_values_supported==null
            || this.metadata.configuration.id_token_encryption_alg_values_supported=='') {
            
            // encryption of id_token is optional
            this.notes = "the claim id_token_encryption_alg_values_supported is not present";
            return true;

            //this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
            //throw("the claim id_token_encryption_alg_values_supported is not present");
        } 

        if(this.metadata.configuration.id_token_encryption_alg_values_supported.includes('RSA_1_5')) {
            this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
            throw("the claim id_token_encryption_alg_values_supported must not contain 'RSA_1_5'");
        }

        this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_11