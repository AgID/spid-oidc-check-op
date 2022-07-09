const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_7 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.7";
        this.description = "parameter token_type MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.tokenresponse.data.token_type) {
            this.notes = this.tokenresponse.data;
            throw("Parameter token_type is not present");
        } else {
            this.notes = this.tokenresponse.data.token_type;
            return true;
        }
    }

}

module.exports = Test_3_2_7