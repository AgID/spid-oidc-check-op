const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_25 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.25";
        this.description = "The metadata MUST contain the claim request_parameter_supported";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.request_parameter_supported==null
            || this.metadata.configuration.request_parameter_supported=='') {
            this.notes = this.metadata.configuration.request_parameter_supported;
            throw("the claim request_parameter_supported is not present");
        } 

        this.notes = this.metadata.configuration.request_parameter_supported;
        return true;

    }

}

module.exports = Test_1_3_25