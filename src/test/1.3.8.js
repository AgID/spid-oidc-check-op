const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_8 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.8";
        this.description = "The metadata MUST contain the claim jwks or signed_jwks_uri";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(
            (this.metadata.configuration.jwks==null || this.metadata.configuration.jwks=='')
            && (this.metadata.configuration.signed_jwks_uri==null || this.metadata.configuration.signed_jwks_uri=='')
        ) {
            this.notes = this.metadata.configuration;
            throw("both the claims jwks and signed_jwks_uri are not present");
        } 

        this.notes = {
            jwks: this.metadata.configuration.jwks, 
            signed_jwks_uri: this.metadata.configuration.signed_jwks_uri
        };
        
        return true;

    }

}

module.exports = Test_1_3_8