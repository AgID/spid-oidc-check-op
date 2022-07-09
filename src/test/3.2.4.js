const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_4 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.4";
        this.description = "parameter access_token MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.tokenresponse.data.access_token) {
            this.notes = this.tokenresponse.data;
            throw("Parameter access_token is not present");
        } else {
            this.notes = this.tokenresponse.data.access_token;
            return true;
        }
    }

}

module.exports = Test_3_2_4