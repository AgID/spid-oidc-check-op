const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_28 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.28";
        this.description = "The metadata CAN contain the claim homepage_uri. DEPRECATED";
        this.validation = "self";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.homepage_uri==null
            || this.metadata.configuration.homepage_uri=='') {
            this.notes = this.metadata.configuration.homepage_uri;
            //throw("the claim homepage_uri is not present");
            return false;
        } 

        this.notes = this.metadata.configuration.homepage_uri;
        return true;

    }

}

module.exports = Test_1_3_28