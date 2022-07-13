const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_4_3_0 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.3.0";
        this.description = "Userinfo Encrypted Token Header: claim alg MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        let userinfo_token = this.userinforesponse.data;

        if(typeof(this.userinforesponse.data)!='string') {
            this.notes = this.userinforesponse.data;
            throw("the content of body is not a valid JWT string");
        }

        if(!validator.isJWT(userinfo_token)) {
            this.notes = userinfo_token;
            throw("userinfo data is not a valid JWT");
        }

        let userinfo_token_header = jwt_decode(userinfo_token, { header: true });

        if(userinfo_token_header.alg==null || userinfo_token_header.alg=='') {
            this.notes = userinfo_token_header;
            throw("claim alg is not present");
        }

        this.notes = userinfo_token_header.alg;
        return true;
    }

}

module.exports = Test_4_3_0