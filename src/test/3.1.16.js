const fs = require("fs");
const path = require("path");
const moment = require('../server/node_modules/moment');
const jose = require('../server/node_modules/node-jose');
const TestTokenRequest = require('../server/lib/test/TestTokenRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');
class Test_3_1_16 extends TestTokenRequest {

    constructor(metadata, authrequest={}, authresponse={}, tokenrequest) {
        super(metadata, authrequest, authresponse, tokenrequest);
        this.num = "3.1.16";
        this.description = "Wrong Token Request:the claim exp in the client_assertion is not present"
        this.validation = "self";
    }

    async exec() {
        this.tokenrequest.client_id = "";
        this.tokenrequest.code = this.authresponse.code;
        this.tokenrequest.code_verifier = this.authrequest.code_verifier;
        this.tokenrequest.grant_type = "authorization_code";
        this.tokenrequest.client_assertion_type = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
        this.tokenrequest.redirect_uri = this.authrequest.redirect_uri;

        const config_key = fs.readFileSync(path.resolve(__dirname, '../config/spid-oidc-check-op-sig.key'));
        const keystore = jose.JWK.createKeyStore();

        let key = await keystore.add(config_key, 'pem');

        let header = {
        
        }

        let iat = moment();
        let exp = iat.clone().add(15, 'm');

        let payload = JSON.stringify({ 
            jti: Utility.getUUID(),
            iss: this.tokenrequest.client_id,
            aud: this.metadata.configuration.token_endpoint,
            iat: iat.unix(),
            exp: exp.unix(),
            sub: this.tokenrequest.client_id
        });

        this.tokenrequest.client_assertion = await jose.JWS.createSign({
            format: 'compact',
            alg: 'RS256',
            fields: {...header}
        }, key).update(payload).final();
    }

}

module.exports = Test_3_1_16