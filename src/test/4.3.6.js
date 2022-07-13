const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const jose = require('../server/node_modules/node-jose');
const fs = require('fs');
const private_key = fs.readFileSync(__dirname + '/../config/spid-oidc-check-op.key','utf8');

class Test_4_3_6 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.3.6";
        this.description = "Userinfo Encrypted Token Payload: The Userinfo Response Encrypted Token MUST be able to be decrypted with the private key of the RP";
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
 
        this.notes = userinfo_sig_token;
        return true;
    }

}

module.exports = Test_4_3_6