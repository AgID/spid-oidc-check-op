const TestMetadata = require('../server/lib/test/TestMetadata.js');
const axios = require('../server/node_modules/axios');

class Test_1_1_1 extends TestMetadata {

    constructor(metadata) {
        super(metadata);
        this.num = "1.1.1";
        this.description = "The response MUST return HTTP Status Code 200 OK";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();
        if(this.metadata.type!='configuration') {
            this.notes = "N/A (document is not provided as openid-configuration)";
            return true;
        }
        let response = await axios.get(this.metadata.url);
        if(response.status!=200) {
            this.notes = response.status;
            throw("The HTTP Status Code is not 200 OK");
        } else {
            return true;
        }
    }

}

module.exports = Test_1_1_1