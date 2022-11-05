const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');

class Test_3_8_2 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponsee, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponsee, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.8.2";
        this.description = "parameter error MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.refreshtokenresponse.data.error) {
            this.notes = this.refreshtokenresponse.data;
            throw("Parameter error is not present");
        } else {
            this.notes = this.refreshtokenresponse.data.error;
            return true;
        }
    }

}

module.exports = Test_3_8_2