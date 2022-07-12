const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_4 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.4";
        this.description = "The userinfo_encryption_alg_values_supported MUST be ['RSA-OAEP', 'RSA-OAEP-256']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.userinfo_encryption_alg_values_supported==null
            || this.metadata.configuration.userinfo_encryption_alg_values_supported=='') {
            this.notes = this.metadata.configuration.userinfo_encryption_alg_values_supported;
            throw("the claim userinfo_encryption_alg_values_supported is not present");
        } 

        if(!(this.metadata.configuration.userinfo_encryption_alg_values_supported.length==2
            && this.metadata.configuration.userinfo_encryption_alg_values_supported.includes('RSA-OAEP')
            && this.metadata.configuration.userinfo_encryption_alg_values_supported.includes('RSA-OAEP-256')
        )) {
            this.notes = this.metadata.configuration.userinfo_encryption_alg_values_supported;
            throw("the claim userinfo_encryption_alg_values_supported is not ['RSA-OAEP', 'RSA-OAEP-256']");
        }

        this.notes = this.metadata.configuration.userinfo_encryption_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_4