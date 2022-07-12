const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_17 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.17";
        this.description = "The metadata CAN contain the claim id_token_encryption_alg_values_supported";
        this.validation = "self";
    }

    async exec() {
        super.exec();
        
        this.notes = this.metadata.configuration.id_token_encryption_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_3_17