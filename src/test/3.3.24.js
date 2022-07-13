const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_24 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.24";
        this.description = "ID Token Payload: claim nonce MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.nonce==null || id_token_payload.nonce=='') {
            this.notes = id_token_payload;
            throw("claim nonce is not present");
        }

        this.notes = id_token_payload.nonce; 
        return true;
    }

}

module.exports = Test_3_3_24