const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_1 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.1";
        this.description = "The value of claim issuer MUST be a valid https URL with no query or fragment";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(!this.metadata.configuration.issuer.toLowerCase().includes('https')) {
            this.notes = this.metadata.configuration.issuer;
            throw("claim issuer is not a valid https URL");
        } 

        if(this.metadata.configuration.issuer.toLowerCase().includes('?')) {
            this.notes = this.metadata.configuration.issuer;
            throw("claim issuer contains query");
        } 

        if(this.metadata.configuration.issuer.toLowerCase().includes('#')) {
            this.notes = this.metadata.configuration.issuer;
            throw("claim issuer contains fragment");
        } 
            
        this.notes = this.metadata.configuration.issuer;
        return true;

    }

}

module.exports = Test_1_3_1