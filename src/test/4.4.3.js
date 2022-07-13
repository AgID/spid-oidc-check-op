const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const axios = require('../server/node_modules/axios');
const jose = require('../server/node_modules/node-jose');
const fs = require('fs');
const private_key = fs.readFileSync(__dirname + '/../config/spid-oidc-check-op.key','utf8');

class Test_4_4_3 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.4.3";
        this.description = "Userinfo Signed Token Payload: the signature of Userinfo Response Signed Token MUST be able to be verified with the public key of the OP";
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

        let keystore_rp = jose.JWK.createKeyStore();
        await keystore_rp.add(private_key, 'pem');
        let userinfo_sig_token = jose.JWE.createDecrypt(keystore_rp).decrypt(userinfo_token);
 
        if(!validator.isJWT(userinfo_sig_token)) {
            this.notes = userinfo_sig_token;
            throw("userinfo data is not a valid JWT");
        }

        let op_jwks = (await axios.get(this.metadata.configuration.jwks_uri)).data;

        if(op_jwks.keys==null || op_jwks.keys=='') {
            this.notes = op_jwks;
            throw("JWKS of OP not found");
        }

        let keystore_op = jose.JWK.createKeyStore();
        for(let k in op_jwks) {
            await keystore_op.add(op_jwks[k], 'json');
        }
        
        let userinfo_sig_token_verified = await jose.JWS.createVerify(keystore_op).verify(userinfo_sig_token);
        

        this.notes = userinfo_sig_token_verified;
        
        return true;
    }

}

module.exports = Test_4_4_3