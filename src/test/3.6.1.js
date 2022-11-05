const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_6_1 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.6.1";
        this.description = "Error Response MUST have HTTP Status Code 400 Bad Request";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.tokenresponse.status!=400) {
            this.notes = this.tokenresponse.status;
            throw("HTTP Status Code is different from 400 Bad Request");
        }

        this.notes = this.tokenresponse.status;
        return true;
    }

}

module.exports = Test_3_6_1 