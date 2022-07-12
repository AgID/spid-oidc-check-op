const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_2 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.2";
        this.description = "The value of claim issuer MUST match with the URL of metadata document";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(!this.metadata.url.toLowerCase().includes(this.metadata.configuration.issuer.toLowerCase())) {
            this.notes = this.metadata.configuration.issuer;
            throw("claim issuer match with the URL of metadata document");
        } 

        this.notes = this.metadata.configuration.issuer;
        return true;

    }

}

module.exports = Test_1_3_2