const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_3_3_0 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.0";
        this.description = "ID Token Header: claim alg MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;

        if(!validator.isJWT(id_token)) {
            this.notes = id_token;
            throw("id_token is not a valid JWT");
        }

        let id_token_header = jwt_decode(id_token, { header: true });

        if(id_token_header.alg==null || id_token_header.alg=='') {
            this.notes = id_token_header;
            throw("claim alg is not present");
        }

        this.notes = id_token_header.alg;
        return true;
    }

}

module.exports = Test_3_3_0