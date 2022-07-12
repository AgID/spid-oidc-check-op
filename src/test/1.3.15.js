const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_15 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.15";
        this.description = "The subject_types_supported MUST be ['pairwise']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(!(this.metadata.configuration.subject_types_supported.length==1
            && this.metadata.configuration.subject_types_supported.includes('pairwise'))) {
            this.notes = this.metadata.configuration.subject_types_supported;
            throw("subject_types_supported is not ['pairwise']");
        } 

        this.notes = this.metadata.configuration.subject_types_supported;
        return true;

    }

}

module.exports = Test_1_3_15