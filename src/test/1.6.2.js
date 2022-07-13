const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_6_2 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.6.2";
        this.description = "If present, the certificate MUST contain OID 1.3.76.16.4.1.2";
        this.validation = "self";
    }

    async exec() {
        super.exec();
        
        this.notes = "TODO automatic";
        return true;

    }

}

module.exports = Test_1_6_2