const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_6_3 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.6.3";
        this.description = "parameter error_description MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.tokenresponse.data.error_description) {
            this.notes = this.tokenresponse.data;
            throw("Parameter error_description is not present");
        } else {
            this.notes = this.tokenresponse.data.error_description;
            return true;
        }
    }

}

module.exports = Test_3_6_3