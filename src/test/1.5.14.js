const TestMetadata = require('../server/lib/test/TestMetadata.js');

class Test_1_5_14 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.5.14";
        this.description = "The request_object_signing_alg_values_supported MUST NOT contain ['none', 'HS256', 'HS384', 'HS512']";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        
        if(this.metadata.configuration.request_object_signing_alg_values_supported==null
            || this.metadata.configuration.request_object_signing_alg_values_supported=='') {
            this.notes = this.metadata.configuration.request_object_signing_alg_values_supported;
            throw("the claim request_object_signing_alg_values_supported is not present");
        } 

        if(this.metadata.configuration.request_object_signing_alg_values_supported.includes('none')) {
            this.notes = this.metadata.configuration.request_object_signing_alg_values_supported;
            throw("the claim request_object_signing_alg_values_supported must not contain 'none'");
        }

        if(this.metadata.configuration.request_object_signing_alg_values_supported.includes('HS256')) {
            this.notes = this.metadata.configuration.request_object_signing_alg_values_supported;
            throw("the claim request_object_signing_alg_values_supported must not contain 'HS256'");
        }

        if(this.metadata.configuration.request_object_signing_alg_values_supported.includes('HS384')) {
            this.notes = this.metadata.configuration.request_object_signing_alg_values_supported;
            throw("the claim request_object_signing_alg_values_supported must not contain 'HS384'");
        }

        if(this.metadata.configuration.request_object_signing_alg_values_supported.includes('HS512')) {
            this.notes = this.metadata.configuration.request_object_signing_alg_values_supported;
            throw("the claim request_object_signing_alg_values_supported must not contain 'HS512'");
        }

        this.notes = this.metadata.configuration.request_object_signing_alg_values_supported;
        return true;

    }

}

module.exports = Test_1_5_14