const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const validator = require('../server/node_modules/validator')

class Test_3_2_15 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.15";
        this.description = "the value of id_token MUST be a valid JWT";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!validator.isJWT(this.tokenresponse.data.id_token)) {
            this.notes = this.tokenresponse.data.id_token;
            throw("The value of id_token is not a valid JWT");
        } else {
            this.notes = this.tokenresponse.data.id_token;
            return true;
        }
    }

}

module.exports = Test_3_2_15