const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_4_1 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.4.1";
        this.description = "If present, the scopes_supported MUST be ['openid','offline_access']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.scopes_supported==null) {
            this.notes = "the claim scopes_supported is not present, it's recommended but not mandatory";
            return true;
        } 

        if(!(this.metadata.configuration.scopes_supported.length==2
            && this.metadata.configuration.scopes_supported.includes('openid')
            && this.metadata.configuration.scopes_supported.includes('offline_access')
        )) {
            this.notes = this.metadata.configuration.scopes_supported;
            throw("the scopes_supported is not ['openid','offline_access']");
        }

        this.notes = this.metadata.configuration.scopes_supported;
        return true;

    }

}

module.exports = Test_1_4_1