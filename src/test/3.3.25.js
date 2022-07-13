const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_25 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.25";
        this.description = "ID Token Payload: the value of nonce MUST be equal to the value of nonce sent with the authorization request";
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

        let authrequest_nonce = this.authrequest.nonce;

        if(id_token_payload.nonce!=this.authrequest.nonce) {
            this.notes = id_token_payload.nonce + " != " + this.authrequest.nonce;
            throw("the value of nonce is not equal to the value of nonce sent with the authorization request");
        }

        this.notes = id_token_payload.nonce; 
        return true;
    }

}

module.exports = Test_3_3_25