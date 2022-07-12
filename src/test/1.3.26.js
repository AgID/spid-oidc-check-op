const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_26 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.26";
        this.description = "The value of request_parameter_supported MUST be true";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.request_parameter_supported!=true) {
            this.notes = this.metadata.configuration.request_parameter_supported;
            throw("the claim request_parameter_supported is not true");
        } 

        this.notes = this.metadata.configuration.request_parameter_supported;
        return true;

    }

}

module.exports = Test_1_3_26