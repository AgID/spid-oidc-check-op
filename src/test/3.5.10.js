const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_5_10 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.10";
        this.description = "Refresh Token Payload: the value of iat MUST be < current date + 3min";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_payload = jwt_decode(refresh_token);

        if(refresh_token_payload.iat==null || refresh_token_payload.iat=='') {
            this.notes = refresh_token_payload;
            throw("claim iat is not present");
        }

        if(!moment.unix(refresh_token_payload.iat).isValid()) {
            this.notes = refresh_token_payload.iat;
            throw("the value of iat is not a valid unix time");
        }

        if(!moment.unix(refresh_token_payload.iat).isBefore(moment().add(3, 'm'))) {
            this.notes = moment.unix(refresh_token_payload.iat).format('DD/MM/YYYY HH:mm:ss') + " >= " + moment().add(3, 'm').format('DD/MM/YYYY HH:mm:ss');
            throw("the value of iat is not a valid unix time");
        }

        this.notes = moment.unix(refresh_token_payload.iat).format('DD/MM/YYYY HH:mm:ss') + " < " + moment().add(3, 'm').format('DD/MM/YYYY HH:mm:ss');
        return true;
    }

}

module.exports = Test_3_5_10