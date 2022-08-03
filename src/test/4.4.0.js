const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const jose = require('../server/node_modules/node-jose');
const fs = require('fs');
const private_key = fs.readFileSync(__dirname + '/../config/spid-oidc-check-op-enc.key','utf8');

class Test_4_4_0 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.4.0";
        this.description = "Userinfo Signed Token Header: claim alg MUST be present";
        this.validation = "automatic";
    }

    async exec() {
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

        let keystore = jose.JWK.createKeyStore();
        await keystore.add(private_key, 'pem');
        let userinfo_sig_token = jose.JWE.createDecrypt(keystore).decrypt(userinfo_token);
 
        if(!validator.isJWT(userinfo_sig_token)) {
            this.notes = userinfo_sig_token;
            throw("userinfo data is not a valid JWT");
        }

        let userinfo_sig_token_header = jwt_decode(userinfo_sig_token, { header: true });

        if(userinfo_sig_token_header.alg==null || userinfo_sig_token_header.alg=='') {
            this.notes = userinfo_sig_token_header;
            throw("claim alg is not present");
        }

        this.notes = userinfo_sig_token_header.alg;
        return true;
    }

}

module.exports = Test_4_4_0