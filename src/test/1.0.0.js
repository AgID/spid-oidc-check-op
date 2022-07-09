const TestMetadata = require('../server/lib/test/TestMetadata.js');
const Validator = require('../server/node_modules/validator');

class Test_1_0_0 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.0.0";
        this.description = "Metadata file MUST be on a valid URL of the OP";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        if(!Validator.isURL(this.metadata.url, { 
            protocols: ['https'], 
            require_protocol: true, 
            require_valid_protocol: true, 
            require_host: true, 
            require_port: false, 
            allow_protocol_relative_urls: false, 
            allow_fragments: true, 
            allow_query_components: true, 
            validate_length: false, 
            require_tld: true, 
            allow_underscores: false, 
            host_whitelist: false, 
            host_blacklist: false, 
            allow_trailing_dot: false, 
            disallow_auth: false
        })) {
            throw("Metadata file is not a valid HTTPS URL: " + this.metadata.url);
        } else {
            this.notes = this.metadata.url;
            return true;
        }
    }

}

module.exports = Test_1_0_0 