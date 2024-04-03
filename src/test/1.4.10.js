const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_10 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.4.10";
        this.description = "The value of claims_parameter_supported MUST be true";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.claims_parameter_supported == null
            || this.metadata.configuration.claims_parameter_supported == '') {
      
            this.notes = this.metadata;
            throw "the claim claims_parameter_supported is not present";
            return false;
        }

        if(this.metadata.configuration.claims_parameter_supported!=true) {
            this.notes = this.metadata.configuration.claims_parameter_supported;
            throw("the claims_parameter_supported is not true");
        }

        this.notes = this.metadata.configuration.claims_parameter_supported;
        return true;

    }

}

module.exports = Test_1_4_10