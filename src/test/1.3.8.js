const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_8 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.8";
        this.description = "The metadata MUST contain the claim jwks_uri";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.jwks_uri==null
            || this.metadata.configuration.jwks_uri=='') {
            this.notes = this.metadata.configuration.jwks_uri;
            throw("the claim jwks_uri is not present");
        } 

        this.notes = this.metadata.configuration.jwks_uri;
        return true;

    }

}

module.exports = Test_1_3_8