const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_7 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.7";
        this.description = "ID Token Payload: claim aud MUST be present";
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

        this.notes = id_token_payload.aud;
        return true;
    }

}

module.exports = Test_3_3_7