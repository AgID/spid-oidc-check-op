const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const oidcTokenHash = require('../server/node_modules/oidc-token-hash');

class Test_3_3_13 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.3.13";
        this.description = "ID Token Payload: the value of at_hash MUST be valid";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let access_token = this.tokenresponse.data.access_token;
        let id_token_header = jwt_decode(id_token, { header: true });
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.at_hash==null || id_token_payload.at_hash=='') {
            this.notes = id_token_payload;
            throw("claim at_hash is not present");
        }

        let calc_at_hash = oidcTokenHash.generate(access_token, id_token_header.alg);

        if(calc_at_hash!=id_token_payload.at_hash) {
            this.notes = "calculated at_hash (" + calc_at_hash + ") is not equal to ID Token at_hash (" + id_token_payload.at_hash + ")";
            throw("calculated at_hash (" + calc_at_hash + ") is not equal to ID Token at_hash (" + id_token_payload.at_hash + ")");
        }

        this.notes = id_token_payload.at_hash;
        return true;
    }

}

module.exports = Test_3_3_13