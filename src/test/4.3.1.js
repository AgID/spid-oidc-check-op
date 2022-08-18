const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const utility = require('../server/lib/utils');

class Test_4_3_1 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.3.1";
        this.description = "Userinfo Encrypted Token Header: the value of alg MUST be one of ['RSA-OAEP', 'RSA-OAEP-256']";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let userinfo_token = this.userinforesponse.data;

        if(typeof(this.userinforesponse.data)!='string') {
            this.notes = this.userinforesponse.data;
            throw("the content of body is not a valid JWT string");
        }
        
        if(!utility.isJWT(userinfo_token, true)) {
            this.notes = userinfo_token;
            throw("userinfo data is not a valid JWT");
        }

        let userinfo_token_header = jwt_decode(userinfo_token, { header: true });

        if(userinfo_token_header.alg==null || userinfo_token_header.alg=='') {
            this.notes = userinfo_token_header;
            throw("claim alg is not present");
        }

        let allowed_alg = ['RSA-OAEP', 'RSA-OAEP-256'];

        if(!allowed_alg.includes(userinfo_token_header.alg)) {
            this.notes = userinfo_token_header.alg;
            throw("the value of alg is not one of ['RSA-OAEP', 'RSA-OAEP-256']");
        }

        this.notes = userinfo_token_header.alg;
        return true;
    }

}

module.exports = Test_4_3_1