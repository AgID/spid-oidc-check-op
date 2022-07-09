const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_13 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.13";
        this.description = "the value of expires_in MUST be <= 300";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(parseInt(this.tokenresponse.data.expires_in)>300) {
            this.notes = this.tokenresponse.data.expires_in;
            throw("The value of expires_in is > 300");
        } else {
            this.notes = this.tokenresponse.data.expires_in;
            return true;
        }
    }

}

module.exports = Test_3_2_13