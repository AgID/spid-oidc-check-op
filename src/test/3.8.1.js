const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');

class Test_3_8_1 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.8.1";
        this.description = "Error Response MUST have HTTP Status Code 400 Bad Request";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.refreshtokenresponse.status!=400) {
            this.notes = this.refreshtokenresponse.status;
            throw("HTTP Status Code is different from 400 Bad Request");
        }

        this.notes = this.refreshtokenresponse.status;
        return true;
    }

}

module.exports = Test_3_8_1 