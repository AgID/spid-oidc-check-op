const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const Utils = require('../server/lib/utils.js');
const validator = require('../server/node_modules/validator');
const path = require("path");
const fs = require("fs");
const jose = require('../server/node_modules/node-jose');

class Test_8_2_8 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "8.2.8";
        this.description = "Grant Token JWS (Grant Token Inner Signed Token) - the value of aud MUST be equal to the issuer of AA present on SPID OIDC Registry at the listing endpoint";
        this.validation = "self";
    }

    async exec() {
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
            let tokens_object = id_token_payload.tokens[t];
            let grant_token = tokens_object.token;

            if(!Utils.isJWT(grant_token, true)) {
                this.notes = grant_token;
                throw("grant token is not a valid JWE");
            }

            const config_prv_aa_key = fs.readFileSync(path.resolve(__dirname, '../config/attribute-authority-private-enc.key'));
            const keystore = jose.JWK.createKeyStore();
            const prv_key = await keystore.add(config_prv_aa_key, 'pem');
            let jwe = await jose.JWE.createDecrypt(prv_key).decrypt(grant_token);

            let grantTokenInnerSignedToken = jwe.payload.toString();

            if(!Utils.isJWT(grantTokenInnerSignedToken)) {
                this.notes = grantTokenInnerSignedToken;
                throw("grant token JWE payload is not a valid JWS (Grant Token Inner Signed Token)");
            }

            // TODO: grab public key from idp metadata in config store
            const config_pub_idp_key = fs.readFileSync(path.resolve(__dirname, '../config/idp-public-sig.crt'));
            
            const pub_crt = await keystore.add(config_pub_idp_key, 'pem');
            let jws = await jose.JWS.createVerify(pub_crt).verify(grantTokenInnerSignedToken);

            let grantTokenInnerSignedTokenPayload = JSON.parse(jws.payload.toString());

            if(grantTokenInnerSignedTokenPayload.aud==null || grantTokenInnerSignedTokenPayload.aud=='') {
                this.notes = grantTokenInnerSignedTokenPayload;
                throw("grant token JWS (Grant Token Inner Signed Token) claim aud is not present");
            }         
        }

        //TODO - check on listing endpoint
        this.notes = "TODO automatic, please check that all grant tokens aud are valid AA against SPID OIDC Registry at the listing endpoint";
        return false; 
    }

}

module.exports = Test_8_2_8