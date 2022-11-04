const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_5_12 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.12";
        this.description = "Refresh Token Payload: the value of exp MUST be a valid unix time";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_payload = jwt_decode(refresh_token);

        if(refresh_token_payload.exp==null || refresh_token_payload.exp=='') {
            this.notes = refresh_token_payload;
            throw("claim exp is not present");
        }

        if(!moment.unix(refresh_token_payload.exp).isValid()) {
            this.notes = refresh_token_payload.exp;
            throw("the value of exp is not a valid unix time");
        }

        this.notes = refresh_token_payload.exp + " = " + moment.unix(refresh_token_payload.exp).format('DD/MM/YYYY HH:mm:ss');
        return true;
    }

}

module.exports = Test_3_5_12