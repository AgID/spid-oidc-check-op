const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_11 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.11";
        this.description = "The response_types_supported MUST be ['code']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(!(this.metadata.configuration.response_types_supported.length==1
            && this.metadata.configuration.response_types_supported.includes('code'))) {
            this.notes = this.metadata.configuration.response_types_supported;
            throw("response_types_supported is not ['code']");
        } 

        this.notes = this.metadata.configuration.response_types_supported;
        return true;

    }

}

module.exports = Test_1_3_11