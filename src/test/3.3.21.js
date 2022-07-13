const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_3_21 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.21";
        this.description = "ID Token Payload: if grant_type was 'authorization_code', the value of exp MUST be = iat + 5min";
        this.validation = "automatic";
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

        if(this.tokenrequest.grant_type=='authorization_code') {
            if(!moment.unix(id_token_payload.exp).isSame(moment.unix(id_token_payload.iat).add(5, 'm'))) {
                this.notes = moment.unix(id_token_payload.exp).format('DD/MM/YYYY HH:mm:ss') + " != " + moment.unix(id_token_payload.iat).add(5, 'm').format('DD/MM/YYYY HH:mm:ss');
                throw("the value of exp is not iat + 5min");
            }

        } else {
            this.notes = "grant_type is not 'authorization_code'";
        }

        return true;
    }

}

module.exports = Test_3_3_21