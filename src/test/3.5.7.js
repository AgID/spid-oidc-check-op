const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const config_rp = require("../config/rp.json");

class Test_3_5_7 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.7";
        this.description = "Refresh Token Payload: the value of aud MUST be equal to the client_id of RP";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_payload = jwt_decode(refresh_token);

        if(refresh_token_payload.aud==null || refresh_token_payload.aud=='') {
            this.notes = refresh_token_payload;
            throw("claim aud is not present");
        }

        if(refresh_token_payload.aud!=config_rp.client_id) {
            this.notes = config_rp.client_id;
            throw("the value of aud is not equal to the client_id of RP");
        }

        this.notes = refresh_token_payload.aud;
        return true;
    }

}

module.exports = Test_3_5_7