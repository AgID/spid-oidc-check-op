const TestMetadata = require('../server/lib/test/TestMetadata.js');
const axios = require('../server/node_modules/axios');
const validator = require('../server/node_modules/validator');

class Test_1_1_2 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.1.2";
        this.description = "The document MUST be returned as a valid JSON document (DEPRECATED)";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();

        if(this.metadata.type=='federation') {

            this.notes = "N/A (metadata is provided as openid-federation)";
            return true;

        } else {

            let response = await axios.get(this.metadata.url);
            if(!validator.isJSON(JSON.stringify(response.data))) {
                throw("The document is not a valid JSON document");
            } else {
                return true;
            }
        }
    }

}

module.exports = Test_1_1_2