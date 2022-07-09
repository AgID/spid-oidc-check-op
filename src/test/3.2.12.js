const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_12 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.12";
        this.description = "parameter expires_in MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.tokenresponse.data.expires_in) {
            this.notes = this.tokenresponse.data;
            throw("Parameter expires_in is not present");
        } else {
            this.notes = this.tokenresponse.data.expires_in;
            return true;
        }
    }

}

module.exports = Test_3_2_12