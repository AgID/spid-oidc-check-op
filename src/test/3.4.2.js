const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_3_4_2 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.4.2";
        this.description = "Access Token Header: claim kid MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let access_token = this.tokenresponse.data.access_token;

        if(!validator.isJWT(access_token)) {
            this.notes = access_token;
            throw("access_token is not a valid JWT");
        }

        let access_token_header = jwt_decode(access_token, { header: true });

        if(access_token_header.kid==null || access_token_header.kid=='') {
            this.notes = access_token_header;
            throw("claim kid is not present");
        }

        this.notes = access_token_header.kid;
        return true;
    }

}

module.exports = Test_3_4_2