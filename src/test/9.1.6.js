const fs = require("fs");
const path = require("path");
const moment = require('../server/node_modules/moment');
const jose = require('../server/node_modules/node-jose');
const jwt_decode = require("../server/node_modules/jwt-decode");
const TestIntrospectionRequest = require('../server/lib/test/TestIntrospectionRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');

class Test_9_1_6 extends TestIntrospectionRequest {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest);
        this.num = "9.1.6";
        this.description = "Introspection Request Wrong - the claim sub in the client_assertion is not present";
        this.validation = "self";
    }

    async exec() {
        
        // extract grant tokens from previous tokenresponse
        let grant_tokens = [];
        {
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

                if(!Utility.isJWT(grant_token, true)) {
                    this.notes = grant_token;
                    throw("grant token is not a valid JWE");
                }

                const config_prv_aa_key = fs.readFileSync(path.resolve(__dirname, '../config/attribute-authority-enc.key'));
                const keystore = jose.JWK.createKeyStore();
                const prv_key = await keystore.add(config_prv_aa_key, 'pem');
                let jwe = await jose.JWE.createDecrypt(prv_key).decrypt(grant_token);

                if(!jwe) {
                    this.notes = jwe.header;
                    throw("grant token is not a vaid JWE");
                }

                grant_tokens.push(grant_token);
            }
        }
        
        // introspect the first grant token
        this.introspectionrequest.client_id = config_rp.client_id;
        this.introspectionrequest.client_assertion_type = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
        this.introspectionrequest.token = grant_tokens[0];

        const config_key = fs.readFileSync(path.resolve(__dirname, '../config/spid-oidc-check-op-sig.key'));
        const keystore = jose.JWK.createKeyStore();

        let key = await keystore.add(config_key, 'pem');

        let header = {};

        let iat = moment();
        let exp = iat.clone().add(15, 'm');

        let payload = JSON.stringify({ 
            jti: Utility.getUUID(),
            iss: this.tokenrequest.client_id,
            aud: this.metadata.configuration.introspection_endpoint,
            iat: iat.unix(),
            exp: exp.unix(),
            //sub: this.tokenrequest.client_id  //REMOVED
        });

        this.introspectionrequest.client_assertion = await jose.JWS.createSign({
            format: 'compact',
            alg: 'RS256',
            fields: {...header}
        }, key).update(payload).final();        
    }

}

module.exports = Test_9_1_6