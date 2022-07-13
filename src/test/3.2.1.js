const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_1 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.1";
        this.description = "response MUST have HTTP Status Code 200 OK";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.tokenresponse.status!=200) {
            this.notes = this.tokenresponse.status;
            throw("HTTP Status Code is different from 200 OK");
        }

        this.notes = this.tokenresponse.status;
        return true;
    }

}

module.exports = Test_3_2_1 