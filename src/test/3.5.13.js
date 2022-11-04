const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_5_13 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.13";
        this.description = "Refresh Token Payload: the value of exp MUST be <= iat + 30 days";
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

        if(refresh_token_payload.exp==null || refresh_token_payload.exp=='') {
            this.notes = refresh_token_payload;
            throw("claim exp is not present");
        }

        if(!moment.unix(refresh_token_payload.exp).isValid()) {
            this.notes = refresh_token_payload.exp;
            throw("the value of exp is not a valid unix time");
        }

        if(!moment.unix(refresh_token_payload.exp).isBefore(moment.unix(refresh_token_payload.iat).add(30, 'd'))) {
            this.notes = moment.unix(refresh_token_payload.exp).format('DD/MM/YYYY HH:mm:ss') + " > " + moment.unix(refresh_token_payload.iat).add(30, 'd').format('DD/MM/YYYY HH:mm:ss');
            throw("the value of exp is > iat + 30 days");
        }

        this.notes = moment.unix(refresh_token_payload.exp).format('DD/MM/YYYY HH:mm:ss') + " <= " + moment.unix(refresh_token_payload.iat).add(30, 'd').format('DD/MM/YYYY HH:mm:ss');
        return true;
    }

}

module.exports = Test_3_5_13