const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_3_15 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.15";
        this.description = "ID Token Payload: the value of iat MUST be a valid unix time";
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

        this.notes = id_token_payload.iat + " = " + moment.unix(id_token_payload.iat).format('DD/MM/YYYY HH:mm:ss');
        return true;
    }

}

module.exports = Test_3_3_15