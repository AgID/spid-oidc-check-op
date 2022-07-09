const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const validator = require('../server/node_modules/validator')

class Test_3_2_6 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.6";
        this.description = "the signature of access_token MUST be valid";
        this.validation = "self";
    }

    exec() {
        super.exec();
        if(!validator.isJWT(this.tokenresponse.data.access_token)) {
            this.notes = this.tokenresponse.data.access_token;
            throw("The value of access_token is not a valid JWT");
        } else {
            this.notes = "TODO";
            return true;
        }
    }

}

module.exports = Test_3_2_6