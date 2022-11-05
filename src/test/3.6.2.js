const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_6_2 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.6.2";
        this.description = "parameter error MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.tokenresponse.data.error) {
            this.notes = this.tokenresponse.data;
            throw("Parameter error is not present");
        } else {
            this.notes = this.tokenresponse.data.error;
            return true;
        }
    }

}

module.exports = Test_3_6_2