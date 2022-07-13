const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_6_1 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.6.1";
        this.description = "The x5c SHOULD contain a cert provided by CA AgID";
        this.validation = "self";
    }

    async exec() {
        super.exec();
        
        this.notes = "TODO automatic";
        return true;

    }

}

module.exports = Test_1_6_1