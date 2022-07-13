const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const axios = require('../server/node_modules/axios');
const jose = require('../server/node_modules/node-jose');
const moment = require("../server/node_modules/moment");
const fs = require('fs');
const private_key = fs.readFileSync(__dirname + '/../config/spid-oidc-check-op.key','utf8');
const config_rp = require("../config/rp.json");

class Test_4_4_10 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.4.10";
        this.description = "Userinfo Signed Token Payload: the value of iat MUST be a valid unix time";
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
        
        if(userinfo_sig_token_verified.payload.iat==null || userinfo_sig_token_verified.payload.iat=='') {
            this.notes = userinfo_sig_token_verified.payload;
            throw("claim iat is not present");
        }

        if(!moment.unix(userinfo_sig_token_verified.payload.iat).isValid()) {
            this.notes = userinfo_sig_token_verified.payload.iat;
            throw("the value of iat is not a valid unix time");
        }

        this.notes = userinfo_sig_token_verified.payload.iat + " = " + moment.unix(userinfo_sig_token_verified.payload.iat).format('DD/MM/YYYY HH:mm:ss');
        
        return true;
    }

}

module.exports = Test_4_4_10