const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_7 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.7";
        this.description = "The metadata MUST contain the claim revocation_endpoint";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.revocation_endpoint==null
            || this.metadata.configuration.revocation_endpoint=='') {
            this.notes = this.metadata.configuration.revocation_endpoint;
            throw("the claim revocation_endpoint is not present");
        } 

        this.notes = this.metadata.configuration.revocation_endpoint;
        return true;

    }

}

module.exports = Test_1_3_7