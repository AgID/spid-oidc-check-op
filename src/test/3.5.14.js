const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_5_14 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.14";
        this.description = "Refresh Token Payload: claim jti MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_payload = jwt_decode(refresh_token);

        if(refresh_token_payload.jti==null || refresh_token_payload.jti=='') {
            this.notes = refresh_token_payload;
            throw("claim jti is not present");
        }

        this.notes = refresh_token_payload.jti;
        return true;
    }

}

module.exports = Test_3_5_14