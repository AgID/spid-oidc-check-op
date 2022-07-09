const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const validator = require('../server/node_modules/validator')

class Test_3_2_16 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.16";
        this.description = "the signature of id_token MUST be valid";
        this.validation = "self";
    }

    exec() {
        super.exec();
        if(!validator.isJWT(this.tokenresponse.data.id_token)) {
            this.notes = this.tokenresponse.data.id_token;
            throw("The value of id_token is not a valid JWT");
        } else {
            this.notes = "TODO";
            return true;
        }
    }

}

module.exports = Test_3_2_16