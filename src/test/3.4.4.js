const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_3_4_4 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.4.4";
        this.description = "Access Token Payload: the value of iss MUST be a valid URL";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let access_token = this.tokenresponse.data.access_token;

        if(!validator.isJWT(access_token)) {
            this.notes = access_token;
            throw("access_token is not a valid JWT");
        }

        let access_token_payload = jwt_decode(access_token);

        if(access_token_payload.iss==null || access_token_payload.iss=='') {
            this.notes = access_token_payload;
            throw("claim iss is not present");
        }

        if(!validator.isURL(access_token_payload.iss)) {
            this.notes = access_token_payload.iss;
            throw("the value of iss is not a valid URL");
        }

        this.notes = access_token_payload.iss;
        return true;
    }

}

module.exports = Test_3_4_4