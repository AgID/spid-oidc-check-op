const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const config_rp = require("../config/rp.json");

class Test_3_3_8 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.8";
        this.description = "ID Token Payload: the value of aud MUST be equal to the client_id of RP";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.aud==null || id_token_payload.aud=='') {
            this.notes = id_token_payload;
            throw("claim aud is not present");
        }

        if(id_token_payload.aud!=config_rp.client_id) {
            this.notes = config_rp.client_id;
            throw("the value of aud is not equal to the client_id of RP");
        }

        this.notes = id_token_payload.aud;
        return true;
    }

}

module.exports = Test_3_3_8