const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_0 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.0";
        this.description = "The metadata MUST contain the claim issuer";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        if(this.metadata.configuration.issuer==null
            || this.metadata.configuration.issuer=='') {
            this.notes = this.metadata.configuration.issuer;
            throw("claim issuer is not present");
        } else {
            this.notes = this.metadata.configuration.issuer;
            return true;
        }
    }

}

module.exports = Test_1_3_0