const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const moment = require("../server/node_modules/moment");

class Test_8_0_2 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "8.0.2";
        this.description = "Attribute Authority Grant Token: objects in tokens array MUST contain claim type";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let id_token = this.tokenresponse.data.id_token;
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.tokens==null || id_token_payload.tokens=='') {
            this.notes = id_token_payload;
            throw("claim tokens is not present");
        }

        if(!Array.isArray(id_token_payload.tokens)) {
            this.notes = tokens;
            throw("claim tokens is not a valid json array");
        }

        for(let t in id_token_payload.tokens) {
            let token = id_token_payload.tokens[t];
            if(token==null || token.type==null || token.type=='') {
                this.notes = token;
                throw("an object in tokens array does not contain claim type");
            }
        }

        this.notes = id_token_payload;
        return true;
    }

}

module.exports = Test_8_0_2