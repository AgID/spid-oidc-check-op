const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const validator = require('../server/node_modules/validator')

class Test_3_2_5 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.5";
        this.description = "the value of access_token MUST be a valid JWT";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!validator.isJWT(this.tokenresponse.data.access_token)) {
            this.notes = this.tokenresponse.data.access_token;
            throw("The value of access_token is not a valid JWT");
        } else {
            this.notes = this.tokenresponse.data.access_token;
            return true;
        }
    }

}

module.exports = Test_3_2_5 