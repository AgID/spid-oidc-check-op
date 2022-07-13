const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_11 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.11";
        this.description = "ID Token Payload: the value of acr MUST be equal or higher than acr_values requested within the authorization request";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.acr==null || id_token_payload.acr=='') {
            this.notes = id_token_payload;
            throw("claim acr is not present");
        }

        let authrequest_acr = this.authrequest.acr_values;
        let authrequest_acr_level = 0;
        if(authrequest_acr.includes("SpidL1")) authrequest_acr_level = 1;
        if(authrequest_acr.includes("SpidL2")) authrequest_acr_level = 2;
        if(authrequest_acr.includes("SpidL3")) authrequest_acr_level = 3;

        let acr_level = 0;
        if(id_token_payload.acr.includes("SpidL1")) acr_level = 1;
        if(id_token_payload.acr.includes("SpidL2")) acr_level = 2;
        if(id_token_payload.acr.includes("SpidL3")) acr_level = 3;

        if(acr_level < authrequest_acr_level) {
            this.notes = authrequest_acr;
            throw("the value of acr is < than acr_values requested within the authorization request");
        }

        this.notes = authrequest_acr;
        return true;
    }

}

module.exports = Test_3_3_11