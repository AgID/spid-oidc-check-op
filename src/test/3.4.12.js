const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");
const validator = require("../server/node_modules/validator");

class Test_3_4_12 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.4.12";
        this.description = "Access Token Payload: the value of exp MUST be a valid unix time";
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

        if(access_token_payload.exp==null || access_token_payload.exp=='') {
            this.notes = access_token_payload;
            throw("claim exp is not present");
        }

        if(!moment.unix(access_token_payload.exp).isValid()) {
            this.notes = access_token_payload.exp;
            throw("the value of exp is not a valid unix time");
        }

        this.notes = access_token_payload.exp;
        return true;
    }

}

module.exports = Test_3_4_12