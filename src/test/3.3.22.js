const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_3_22 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.22";
        this.description = "ID Token Payload: if grant_type was 'refresh_token', the value of exp MUST be = iat + 30 days - (iat of original authentication)";
        this.validation = "self";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
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

        if(this.tokenrequest.grant_type=='refresh_token') {
            // TODO better
            if(!moment.unix(id_token_payload.exp).isBefore(moment.unix(id_token_payload.iat).add(30, 'd'))) {
                this.notes = moment.unix(id_token_payload.exp).format('DD/MM/YYYY HH:mm:ss') + " > " + moment.unix(id_token_payload.iat).add(30, 'd').format('DD/MM/YYYY HH:mm:ss');
                throw("the value of exp is not < iat + 30 days");
            }

        } else {
            this.notes = "grant_type is not 'refresh_token'";
        }

        return true;
    }

}

module.exports = Test_3_3_22