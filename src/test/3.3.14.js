const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_14 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.14";
        this.description = "ID Token Payload: claim iat MUST be present";
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

        this.notes = id_token_payload.iat;
        return true;
    }

}

module.exports = Test_3_3_14