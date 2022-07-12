const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_12 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.12";
        this.description = "The metadata MUST contain the claim acr_values_supported";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.acr_values_supported==null
            || this.metadata.configuration.acr_values_supported=='') {
            this.notes = this.metadata.configuration.acr_values_supported;
            throw("the claim acr_values_supported is not present");
        } 

        this.notes = this.metadata.configuration.acr_values_supported;
        return true;

    }

}

module.exports = Test_1_3_12