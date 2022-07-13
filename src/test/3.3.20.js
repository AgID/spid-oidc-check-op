const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_3_20 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.20";
        this.description = "ID Token Payload: the value of exp MUST be a valid unix time";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.exp==null || id_token_payload.exp=='') {
            this.notes = id_token_payload;
            throw("claim exp is not present");
        }

        if(!moment.unix(id_token_payload.exp).isValid()) {
            this.notes = id_token_payload.exp;
            throw("the value of exp is not a valid unix time");
        }

        this.notes = id_token_payload.exp + " = " + moment.unix(id_token_payload.exp).format('DD/MM/YYYY HH:mm:ss');
        return true;
    }

}

module.exports = Test_3_3_20