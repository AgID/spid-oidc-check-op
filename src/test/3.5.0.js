const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_3_5_0 extends TestRefreshTokenResponse { 

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.0";
        this.description = "Refresh Token Header: claim alg MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;

        if(!validator.isJWT(refresh_token)) {
            this.notes = refresh_token;
            throw("refresh_token is not a valid JWT");
        }

        let refresh_token_header = jwt_decode(refresh_token, { header: true });

        if(refresh_token_header.alg==null || refresh_token_header.alg=='') {
            this.notes = refresh_token_header;
            throw("claim alg is not present");
        }

        this.notes = refresh_token_header.alg;
        return true;
    }

}

module.exports = Test_3_5_0