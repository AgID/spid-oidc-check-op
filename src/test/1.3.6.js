const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_6 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.6";
        this.description = "The metadata MUST contain the claim introspection_endpoint";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.introspection_endpoint==null
            || this.metadata.configuration.introspection_endpoint=='') {
            this.notes = this.metadata.configuration.introspection_endpoint;
            throw("the claim introspection_endpoint is not present");
        } 

        this.notes = this.metadata.configuration.introspection_endpoint;
        return true;

    }

}

module.exports = Test_1_3_6