const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_5_15 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.15";
        this.description = "Refresh Token Payload: if use case is CU1 or CU2 (SPID_A41) the value of exp MUST be <= iat + 30 days - (iat - iat of original authentication)";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let authrequest = jwt_decode(this.authrequest.request);
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

        let refresh_token_iat = moment.unix(refresh_token_payload.iat);
        let refresh_token_exp = moment.unix(refresh_token_payload.exp);
        let authrequest_iat_diff = refresh_token_iat.diff(moment.unix(authrequest.iat));
        
        if(refresh_token_exp.isAfter(
            refresh_token_iat.add(30, 'd').subtract(authrequest_iat_diff)
        )) {
            this.notes = moment.unix(refresh_token_payload.exp).format('DD/MM/YYYY HH:mm:ss') + 
                            " > " + moment.unix(refresh_token_payload.iat).add(30, 'd').subtract(authrequest_iat_diff).format('DD/MM/YYYY HH:mm:ss') + ". ";
            this.notes += "iat: " + moment.unix(refresh_token_payload.iat).format('DD/MM/YYYY HH:mm:ss') + ". ";
            this.notes += "iat of authrequest: " + moment.unix(authrequest.iat).format('DD/MM/YYYY HH:mm:ss') + ". ";
            this.notes += "iat + 30 days: " + moment.unix(refresh_token_payload.iat).add(30, 'd').format('DD/MM/YYYY HH:mm:ss') + ". ";
            this.notes += "iat + 30 days - iat of authrequest: " + moment.unix(refresh_token_payload.iat).add(30, 'd').subtract(authrequest_iat_diff).format('DD/MM/YYYY HH:mm:ss') + ". ";
            throw("the value of exp is not < (iat + 30 days - iat of original authentication)");
        }

        this.notes = moment.unix(refresh_token_payload.exp).format('DD/MM/YYYY HH:mm:ss') + " <= " + moment.unix(refresh_token_payload.iat).add(30, 'd').subtract(authrequest_iat_diff).format('DD/MM/YYYY HH:mm:ss');
        return true;
    }

}

module.exports = Test_3_5_15