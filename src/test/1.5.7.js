const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_7 extends TestMetadata {

    constructor(metadata) { 
        super(metadata);
        this.num = "1.5.7";
        this.description = "The request_object_encryption_alg_values_supported MUST contain ['RSA-OAEP', 'RSA-OAEP-256']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.request_object_encryption_alg_values_supported==null
            || this.metadata.configuration.request_object_encryption_alg_values_supported=='') {

            // the encryption of request object is optional
            this.notes = "the claim request_object_encryption_alg_values_supported is not present";
            return true;

            //this.notes = this.metadata.configuration.request_object_encryption_alg_values_supported;
            //throw("the claim request_object_encryption_alg_values_supported is not present");
        } 

        if(!this.metadata.configuration.request_object_encryption_alg_values_supported.includes('RSA-OAEP')) {
            this.notes = this.metadata.configuration.request_object_encryption_alg_values_supported;
            throw("the claim request_object_encryption_alg_values_supported does not contain 'RSA-OAEP'");
        }

        if(!this.metadata.configuration.request_object_encryption_alg_values_supported.includes('RSA-OAEP-256')) {
            this.notes = this.metadata.configuration.request_object_encryption_alg_values_supported;
            throw("the claim request_object_encryption_alg_values_supported does not contain 'RSA-OAEP-256'");
        }

        this.notes = this.metadata.configuration.request_object_encryption_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_7