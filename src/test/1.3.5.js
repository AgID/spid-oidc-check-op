const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_5 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.5";
        this.description = "The metadata MUST contain the claim userinfo_endpoint";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.userinfo_endpoint==null
            || this.metadata.configuration.userinfo_endpoint=='') {
            this.notes = this.metadata.configuration.userinfo_endpoint;
            throw("the claim userinfo_endpoint is not present");
        } 

        this.notes = this.metadata.configuration.userinfo_endpoint;
        return true;

    }

}

module.exports = Test_1_3_5