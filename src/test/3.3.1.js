const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");

class Test_3_3_1 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.1";
        this.description = "ID Token Header: the value of alg MUST be one of ['RS256', 'RS512']";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_header = jwt_decode(id_token, { header: true });

        if(id_token_header.alg==null || id_token_header.alg=='') {
            this.notes = id_token_header;
            throw("claim alg is not present");
        } 

        let allowed_alg = ['RS256', 'RS512'];
        if(!allowed_alg.includes(id_token_header.alg)) {
            this.notes = id_token_header.alg;
            throw("alg is not one of ['RS256', 'RS512']");
        }

        this.notes = id_token_header.alg;
        return true;
    }

}

module.exports = Test_3_3_1