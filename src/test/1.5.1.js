const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_1 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.1";
        this.description = "The id_token_encryption_alg_values_supported MUST be ['RSA-OAEP', 'RSA-OAEP-256']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.id_token_encryption_alg_values_supported==null
            || this.metadata.configuration.id_token_encryption_alg_values_supported=='') {
            this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
            throw("the claim id_token_encryption_alg_values_supported is not present");
        } 

        if(!(this.metadata.configuration.id_token_encryption_alg_values_supported.length==2
            && this.metadata.configuration.id_token_encryption_alg_values_supported.includes('RSA-OAEP')
            && this.metadata.configuration.id_token_encryption_alg_values_supported.includes('RSA-OAEP-256')
        )) {
            this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
            throw("the claim id_token_encryption_alg_values_supported is not ['RSA-OAEP', 'RSA-OAEP-256']");
        }

        this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_1