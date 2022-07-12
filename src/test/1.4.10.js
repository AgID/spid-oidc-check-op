const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_10 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.4.10";
        this.description = "If present, the value of claims_parameter_supported MUST be true";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.claims_parameter_supported==null) {
            this.notes = "the claim claims_parameter_supported is not present, it's recommended but not mandatory";
            return true;
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