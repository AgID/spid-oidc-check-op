const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_9 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.9";
        this.description = "If signed_jwks_uri is present, the URL domain of signed_jwks_uri value MUST match the issuer";
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
        
        if(this.metadata.configuration.signed_jwks_uri!=null
            && this.metadata.configuration.signed_jwks_uri!='') {

            if(!this.metadata.configuration.signed_jwks_uri.toLowerCase().includes(this.metadata.configuration.issuer.toLowerCase())) {
                this.notes = this.metadata.configuration.signed_jwks_uri;
                throw("the claim signed_jwks_uri not match the issuer");

            } else {
                this.notes = this.metadata.configuration.signed_jwks_uri;
            }

        } else {
            this.notes = {
                jwks: this.metadata.configuration.jwks, 
                signed_jwks_uri: this.metadata.configuration.signed_jwks_uri
            };
        }

        return true;

    }

}

module.exports = Test_1_3_9