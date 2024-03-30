const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_2 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.2";
        this.description = "The id_token_encryption_enc_values_supported MUST contain ['A128CBC-HS256', 'A256CBC-HS512']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.id_token_encryption_enc_values_supported==null
            || this.metadata.configuration.id_token_encryption_enc_values_supported=='') {

            // encryption of id_token is optional
            this.notes = "the claim id_token_encryption_enc_values_supported is not present";
            return true;

            //this.notes = this.metadata.configuration.id_token_encryption_enc_values_supported;
            //throw("the claim id_token_encryption_enc_values_supported is not present");
        } 

        if(!this.metadata.configuration.id_token_encryption_enc_values_supported.includes('A128CBC-HS256')) {
            this.notes = this.metadata.configuration.id_token_encryption_enc_values_supported;
            throw("the claim id_token_encryption_enc_values_supported does not contain 'A128CBC-HS256'");
        }

        if(!this.metadata.configuration.id_token_encryption_enc_values_supported.includes('A256CBC-HS512')) {
            this.notes = this.metadata.configuration.id_token_encryption_enc_values_supported;
            throw("the claim id_token_encryption_enc_values_supported does not contain 'A256CBC-HS512'");
        }

        this.notes = this.metadata.configuration.id_token_encryption_enc_values_supported;
        return true;

    }

}

module.exports = Test_1_5_2