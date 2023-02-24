const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_17 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.17";
        this.description = "The metadata MUST NOT contain the claim id_token_encryption_alg_values_supported  (Avviso SPID n.41 v.2)";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.id_token_encryption_alg_values_supported!=null
            && this.metadata.configuration.id_token_encryption_alg_values_supported!='') {

            // if optional
            //this.notes = "the claim id_token_encryption_alg_values_supported is not present";
            //return true;

            this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
            throw("the claim id_token_encryption_alg_values_supported is present");
        } 

        this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_3_17