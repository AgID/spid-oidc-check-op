const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_5_1 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.1";
        this.description = "Refresh Token Header: the value of alg MUST be one of ['RS256', 'RS512']";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_header = jwt_decode(refresh_token, { header: true });

        if(refresh_token_header.alg==null || refresh_token_header.alg=='') {
            this.notes = refresh_token_header;
            throw("claim alg is not present");
        } 

        let allowed_alg = ['RS256', 'RS512'];
        if(!allowed_alg.includes(refresh_token_header.alg)) {
            this.notes = refresh_token_header.alg;
            throw("alg is not one of ['RS256', 'RS512']");
        }

        this.notes = refresh_token_header.alg;
        return true;
    }

}

module.exports = Test_3_5_1