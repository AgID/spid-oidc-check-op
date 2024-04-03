const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_3 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.4.3";
        this.description = "The grant_types_supported MUST be ['authorization_code','refresh_token']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.grant_types_supported == null
            || this.metadata.configuration.grant_types_supported == '') {
                
            this.notes = this.metadata;
            throw "the claim grant_types_supported is not present";
            return false;
        }

        if(!(this.metadata.configuration.grant_types_supported.length==2
            && this.metadata.configuration.grant_types_supported.includes('authorization_code')
            && this.metadata.configuration.grant_types_supported.includes('refresh_token')
        )) {
            this.notes = this.metadata.configuration.grant_types_supported;
            throw("the grant_types_supported is not ['authorization_code','refresh_token']");
        }

        this.notes = this.metadata.configuration.grant_types_supported;
        return true;

    }

}

module.exports = Test_1_4_3