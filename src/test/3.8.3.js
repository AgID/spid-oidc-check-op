const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');

class Test_3_8_3 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.8.3";
        this.description = "parameter error_description MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.refreshtokenresponse.data.error_description) {
            this.notes = this.refreshtokenresponse.data;
            throw("Parameter error_description is not present");
        } else {
            this.notes = this.refreshtokenresponse.data.error_description;
            return true;
        }
    }

}

module.exports = Test_3_8_3