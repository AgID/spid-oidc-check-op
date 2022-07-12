const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_9 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.9";
        this.description = "The URL domain of jwks_uri value MUST match the issuer";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(!this.metadata.configuration.jwks_uri.toLowerCase().includes(
            this.metadata.configuration.issuer.toLowerCase())
        ) {
            this.notes = this.metadata.configuration.jwks_uri;
            throw("the claim jwks_uri not match the issuer");
        } 

        this.notes = this.metadata.configuration.jwks_uri;
        return true;

    }

}

module.exports = Test_1_3_9