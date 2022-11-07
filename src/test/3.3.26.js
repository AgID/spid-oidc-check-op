const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_3_3_26 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.3.26";
        this.description = "ID Token Payload: if grant_type was 'refresh_token', the value of acr MUST be 'https://www.spid.gov.it/SpidL1'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.refreshtokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.acr==null || id_token_payload.acr=='') {
            this.notes = id_token_payload;
            throw("claim acr is not present");
        }

        let allowed_acr = ['https://www.spid.gov.it/SpidL1'];
        
        if(!allowed_acr.includes(id_token_payload.acr)) {
            this.notes = id_token_payload.acr;
            throw("the value of acr is not 'https://www.spid.gov.it/SpidL1'");
        }

        this.notes = id_token_payload.acr;
        return true;
    }

}

module.exports = Test_3_3_26