const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const config_rp = require("../config/rp.json");

class Test_3_4_7 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.4.7";
        this.description = "Access Token Payload: the value of aud MUST be equal to the client_id of RP";
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

        if(access_token_payload.aud==null || access_token_payload.aud=='') {
            this.notes = access_token_payload;
            throw("claim aud is not present");
        }

        if(access_token_payload.aud!=config_rp.client_id) {
            this.notes = config_rp.client_id;
            throw("the value of aud is not equal to the client_id of RP");
        }

        this.notes = access_token_payload.aud;
        return true;
    }

}

module.exports = Test_3_4_7