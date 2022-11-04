const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_5_2 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.5.2";
        this.description = "Refresh Token Header: claim kid MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let refresh_token = this.refreshtokenresponse.data.refresh_token;
        let refresh_token_header = jwt_decode(refresh_token, { header: true });

        if(refresh_token_header.kid==null || refresh_token_header.kid=='') {
            this.notes = refresh_token_header;
            throw("claim kid is not present");
        }

        this.notes = refresh_token_header.kid;
        return true;
    }

}

module.exports = Test_3_5_2