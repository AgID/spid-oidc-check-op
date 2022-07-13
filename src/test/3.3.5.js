const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_5 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.5";
        this.description = "ID Token Payload: the value of iss MUST be equal to the URL of the OP";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(!this.metadata.url.includes(id_token_payload.iss)) {
            this.notes = id_token_payload.iss;
            throw("the value of iss not match the metadata URL of the OP");
        }

        this.notes = id_token_payload.iss;
        return true;
    }

}

module.exports = Test_3_3_5