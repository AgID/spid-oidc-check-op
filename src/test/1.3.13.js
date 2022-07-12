const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_3_13 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.3.13";
        this.description = "The acr_values_supported MUST be among ['https://www.spid.gov.it/SpidL1','https://www.spid.gov.it/SpidL2','https://www.spid.gov.it/SpidL3']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.acr_values_supported==null
            || this.metadata.configuration.acr_values_supported=='') {
            this.notes = this.metadata.configuration.acr_values_supported;
            throw("the claim acr_values_supported is not present");
        } 

        let acr_allowed = ['https://www.spid.gov.it/SpidL1','https://www.spid.gov.it/SpidL2','https://www.spid.gov.it/SpidL3']
        
        if(!this.metadata.configuration.acr_values_supported.every(val => acr_allowed.includes(val))) {
            this.notes = this.metadata.configuration.acr_values_supported;
            throw("the claim acr_values_supported is not a subset of ['https://www.spid.gov.it/SpidL1','https://www.spid.gov.it/SpidL2','https://www.spid.gov.it/SpidL3']");
        }

        this.notes = this.metadata.configuration.acr_values_supported;
        return true;

    }

}

module.exports = Test_1_3_13