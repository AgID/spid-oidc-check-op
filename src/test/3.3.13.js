const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_13 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.13";
        this.description = "ID Token Payload: the value of at_hash MUST be valid";
        this.validation = "self";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.at_hash==null || id_token_payload.at_hash=='') {
            this.notes = id_token_payload;
            throw("claim at_hash is not present");
        }

        this.notes = "automatic TO DO";
        return true;
    }

}

module.exports = Test_3_3_13