const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_8 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.8";
        this.description = "The request_object_encryption_enc_values_supported MUST contain ['A128CBC-HS256', 'A256CBC-HS512']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.request_object_encryption_enc_values_supported==null
            || this.metadata.configuration.request_object_encryption_enc_values_supported=='') {

            // the encryption of request object is optional
            this.notes = "the claim request_object_encryption_enc_values_supported is not present";
            return true;

            //this.notes = this.metadata.configuration.request_object_encryption_enc_values_supported;
            //throw("the claim request_object_encryption_enc_values_supported is not present");
        } 

        if(!this.metadata.configuration.request_object_encryption_enc_values_supported.includes('A128CBC-HS256')) {
            this.notes = this.metadata.configuration.request_object_encryption_enc_values_supported;
            throw("the claim request_object_encryption_enc_values_supported does not contain 'A128CBC-HS256'");
        }

        if(!this.metadata.configuration.request_object_encryption_enc_values_supported.includes('A256CBC-HS512')) {
            this.notes = this.metadata.configuration.request_object_encryption_enc_values_supported;
            throw("the claim request_object_encryption_enc_values_supported does not contain 'A256CBC-HS512'");
        }

        this.notes = this.metadata.configuration.request_object_encryption_enc_values_supported;
        return true;

    }

}

module.exports = Test_1_5_8