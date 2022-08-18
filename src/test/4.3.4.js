const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const utility = require('../server/lib/utils');

class Test_4_3_4 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.3.4";
        this.description = "Userinfo Encrypted Token Header: claim cty MUST be present";
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

        if(userinfo_token_header.cty==null || userinfo_token_header.cty=='') {
            this.notes = userinfo_token_header;
            throw("claim cty is not present");
        }

        this.notes = userinfo_token_header.cty;
        return true;
    }

}

module.exports = Test_4_3_4