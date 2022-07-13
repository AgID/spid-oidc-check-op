const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_10 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.10";
        this.description = "ID Token Payload: the value of acr MUST be one of ['https://www.spid.gov.it/SpidL1', 'https://www.spid.gov.it/SpidL2', 'https://www.spid.gov.it/SpidL3']";
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

        let allowed_acr = ['https://www.spid.gov.it/SpidL1', 'https://www.spid.gov.it/SpidL2', 'https://www.spid.gov.it/SpidL3'];

        if(!allowed_acr.includes(id_token_payload.acr)) {
            this.notes = id_token_payload.acr;
            throw("the value of acr is not one of ['https://www.spid.gov.it/SpidL1', 'https://www.spid.gov.it/SpidL2', 'https://www.spid.gov.it/SpidL3']");
        }

        this.notes = id_token_payload.acr;
        return true;
    }

}

module.exports = Test_3_3_10