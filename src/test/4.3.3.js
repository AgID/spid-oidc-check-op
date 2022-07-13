const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");

class Test_4_3_3 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.3.3";
        this.description = "Userinfo Encrypted Token Header: the value of enc MUST be one of ['A128CBC-HS256', 'A256CBC-HS512']";
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

        if(userinfo_token_header.enc==null || userinfo_token_header.enc=='') {
            this.notes = userinfo_token_header;
            throw("claim enc is not present");
        }

        let allowed_enc = ['A128CBC-HS256', 'A256CBC-HS512'];

        if(!allowed_enc.includes(userinfo_token_header.enc)) {
            this.notes = userinfo_token_header.enc;
            throw("the value of enc is not one of ['A128CBC-HS256', 'A256CBC-HS512']");
        }

        this.notes = userinfo_token_header.enc;
        return true;
    }

}

module.exports = Test_4_3_3