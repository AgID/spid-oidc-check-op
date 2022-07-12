const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_6_0 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.6.0";
        this.description = "The jwks SHOULD contain x5c";
        this.validation = "self";
    }

    async exec() {
        super.exec();
        
        this.notes = "";
        return true;

    }

}

module.exports = Test_1_6_0