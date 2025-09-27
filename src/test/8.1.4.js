const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const Utils = require('../server/lib/utils.js');
const path = require("path");
const fs = require("fs");
const jose = require('../server/node_modules/node-jose');

class Test_8_1_4 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "8.1.4";
        this.description = "Grant Token JWE: claim typ MUST be present";
        this.validation = "automatic";
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

            if(jwe.header.typ==null || jwe.header.typ=='') {
                this.notes = jwe.header;
                throw("grant token JWE claim typ is not present");
                
            }
        }

        this.notes = id_token_payload;
        return true;
    }

}

module.exports = Test_8_1_4