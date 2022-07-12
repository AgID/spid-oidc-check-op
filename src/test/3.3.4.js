const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_3_3_4 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.4";
        this.description = "ID Token Payload: the value of iss MUST be a valid URL";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(!Validator.isURL(id_token_payload.iss)) {
            this.notes = id_token_payload.iss;
            throw("claim iss is not a valid URL");
        }

        this.notes = id_token_payload.iss;
        return true;
    }

}

module.exports = Test_3_3_4