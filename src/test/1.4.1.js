const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_1 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.4.1";
        this.description = "The scopes_supported MUST be at least ['openid','offline_access']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.scopes_supported == null
            || this.metadata.configuration.scopes_supported == '') {
                
            this.notes = this.metadata;
            throw "the claim scopes_supported is not present";
            return false;
        }

        if(!(this.metadata.configuration.scopes_supported.length>=2
            && this.metadata.configuration.scopes_supported.includes('openid')
            && this.metadata.configuration.scopes_supported.includes('offline_access')
            //&& this.metadata.configuration.scopes_supported.includes('profile')
            //&& this.metadata.configuration.scopes_supported.includes('email')
        )) {
            this.notes = this.metadata.configuration.scopes_supported;
            throw("the scopes_supported does not contain ['openid','offline_access']");
        }

        this.notes = this.metadata.configuration.scopes_supported;
        return true;

    }

}

module.exports = Test_1_4_1