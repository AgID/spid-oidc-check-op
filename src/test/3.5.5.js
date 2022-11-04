const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_5_5 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.5";
        this.description = "Refresh Token Payload: the value of iss MUST be equal to the URL of the OP";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_payload = jwt_decode(refresh_token);

        if(!this.metadata.url.includes(refresh_token_payload.iss)) {
            this.notes = refresh_token_payload.iss;
            throw("the value of iss not match the metadata URL of the OP");
        }

        this.notes = refresh_token_payload.iss;
        return true;
    }

}

module.exports = Test_3_5_5