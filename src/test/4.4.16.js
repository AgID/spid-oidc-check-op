const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require("../server/node_modules/validator");
const axios = require('../server/node_modules/axios');
const jose = require('../server/node_modules/node-jose');
const fs = require('fs');
const private_key = fs.readFileSync(__dirname + '/../config/spid-oidc-check-op-enc.key','utf8');
const config_rp = require("../config/rp.json");

class Test_4_4_16 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.4.16";
        this.description = "Userinfo Signed Token Payload: the value of sub MUST be equal to the value of sub in the id_token";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();

        if(!this.tokenresponse.data.id_token) {
            this.notes = this.tokenresponse.data;
            throw("Parameter id_token is not present");
        }
        
        let id_token_payload = jwt_decode(id_token);

        if(id_token_payload.sub==null || id_token_payload.sub=='') {
            this.notes = id_token_payload;
            throw("claim sub in the id_token is not present");
        }

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
        
        if(userinfo_sig_token_verified.payload.sub==null || userinfo_sig_token_verified.payload.sub=='') {
            this.notes = userinfo_sig_token_verified.payload;
            throw("claim sub is not present");
        }

        if(userinfo_sig_token_verified.payload.sub != id_token_payload.sub) {
            this.notes = id_token_payload.sub;
            throw("the value of sub is not equal to the value of sub in the id_token");
        }

        this.notes = userinfo_sig_token_verified.payload.sub;
        
        return true;
    }

}

module.exports = Test_4_4_16