const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_3 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.3";
        this.description = "The metadata MUST contain the claim authorization_endpoint";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.authorization_endpoint==null
            || this.metadata.configuration.authorization_endpoint=='') {
            this.notes = this.metadata.configuration.authorization_endpoint;
            throw("the claim authorization_endpoint is not present");
        } 

        this.notes = this.metadata.configuration.authorization_endpoint;
        return true;

    }

}

module.exports = Test_1_3_3