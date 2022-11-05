const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');

class Test_3_8_0 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.8.0";
        this.description = "Error Response MUST have Content-Type 'application/json'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.refreshtokenresponse.headers['content-type'].includes('application/json')) {
            this.notes = this.refreshtokenresponse.headers['content-type'];
            throw("Content-Type is not 'application/json'");
        } else {
            this.notes = this.refreshtokenresponse.headers['content-type'];
            return true;
        }
    }

}

module.exports = Test_3_8_0