const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_27 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.27";
        this.description = "The metadata MUST contain the claim organization_name";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.organization_name==null
            || this.metadata.configuration.organization_name=='') {
            this.notes = this.metadata.configuration.organization_name;
            throw("the claim organization_name is not present");
        } 

        this.notes = this.metadata.configuration.organization_name;
        return true;

    }

}

module.exports = Test_1_3_27