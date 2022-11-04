const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_3_22 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.3.22";
        this.description = "ID Token Payload: if grant_type was 'refresh_token', the value of exp MUST be = iat + 30 days - (iat of original authentication)";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let authrequest = jwt_decode(this.authrequest.request);
        let id_token = this.refreshtokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.iat==null || id_token_payload.iat=='') {
            this.notes = id_token_payload;
            throw("claim iat is not present");
        }

        if(!moment.unix(id_token_payload.iat).isValid()) {
            this.notes = id_token_payload.iat;
            throw("the value of iat is not a valid unix time");
        }

        if(id_token_payload.exp==null || id_token_payload.exp=='') {
            this.notes = id_token_payload;
            throw("claim exp is not present");
        }

        if(!moment.unix(id_token_payload.exp).isValid()) {
            this.notes = id_token_payload.exp;
            throw("the value of exp is not a valid unix time");
        }

        if(this.refreshtokenrequest.grant_type=='refresh_token') {
            let authrequest_iat_diff = moment.unix(id_token_payload.iat).diff(moment.unix(authrequest.iat));
            if(!moment.unix(id_token_payload.exp).isBefore(
                moment.unix(id_token_payload.iat).add(30, 'd').subtract(authrequest_iat_diff)
            )) {
                this.notes = moment.unix(id_token_payload.exp).format('DD/MM/YYYY HH:mm:ss') + 
                                " > " + moment.unix(id_token_payload.iat).add(30, 'd').subtract(authrequest_iat_diff).format('DD/MM/YYYY HH:mm:ss') + ". ";
                this.notes += "iat: " + moment.unix(id_token_payload.iat).format('DD/MM/YYYY HH:mm:ss') + ". ";
                this.notes += "iat of authrequest: " + moment.unix(authrequest.iat).format('DD/MM/YYYY HH:mm:ss') + ". ";
                this.notes += "iat + 30 days: " + moment.unix(id_token_payload.iat).add(30, 'd').format('DD/MM/YYYY HH:mm:ss') + ". ";
                this.notes += "iat + 30 days - iat of authrequest: " + moment.unix(id_token_payload.iat).add(30, 'd').subtract(authrequest_iat_diff).format('DD/MM/YYYY HH:mm:ss') + ". ";
                throw("the value of exp is not < (iat + 30 days - iat of original authentication)");
            }

        } else {
            this.notes = "grant_type is not 'refresh_token'";
        }

        return true;
    }

}

module.exports = Test_3_3_22