const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_14 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.14";
        this.description = "parameter id_token MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.tokenresponse.data.id_token) {
            this.notes = this.tokenresponse.data;
            throw("Parameter id_token is not present");
        } else {
            this.notes = this.tokenresponse.data.id_token;
            return true;
        }
    }

}

module.exports = Test_3_2_14