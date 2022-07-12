const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_14 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.14";
        this.description = "The metadata MUST contain the claim subject_types_supported";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.subject_types_supported==null
            || this.metadata.configuration.subject_types_supported=='') {
            this.notes = this.metadata.configuration.subject_types_supported;
            throw("the claim subject_types_supported is not present");
        } 

        this.notes = this.metadata.configuration.subject_types_supported;
        return true;

    }

}

module.exports = Test_1_3_14