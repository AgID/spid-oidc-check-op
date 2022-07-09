const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_8 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.8";
        this.description = "the value of token_type MUST be 'Bearer'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.tokenresponse.data.token_type!='Bearer') {
            this.notes = this.tokenresponse.data.token_type;
            throw("Parameter token_type is not 'Bearer'");
        } else {
            this.notes = this.tokenresponse.data.token_type;
            return true;
        }
    }

}

module.exports = Test_3_2_8