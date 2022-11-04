const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_3_5_4 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.4";
        this.description = "Refresh Token Payload: the value of iss MUST be a valid URL";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_payload = jwt_decode(refresh_token);

        if(!validator.isURL(refresh_token_payload.iss)) {
            this.notes = refresh_token_payload.iss;
            throw("claim iss is not a valid URL");
        }

        this.notes = refresh_token_payload.iss;
        return true;
    }

}

module.exports = Test_3_5_4