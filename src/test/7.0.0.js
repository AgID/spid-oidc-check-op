const fs = require("fs");
const path = require("path");
const x509 = require("../server/node_modules/@peculiar/x509");
const base64url = require('../server/node_modules/base64url');
const moment = require('../server/node_modules/moment');
const jose = require('../server/node_modules/node-jose');
const pkceChallenge = require("../server/node_modules/pkce-challenge").default;
const TestAuthRequest = require('../server/lib/test/TestAuthRequest.js');
const Utility = require('../server/lib/utils.js');
const config_rp = require('../config/rp.json');

class Test_7_0_0 extends TestAuthRequest {

    constructor(metadata, authrequest={}) {
        super(metadata, authrequest);
        this.num = "7.0.0";
        this.description = "Executes the basic OIDC Authorization Code Flow for Attribute Authority. The authorization request is correct, prompt=consent login, scope=openid, acr_values=https://www.spid.gov.it/SpidL1, authorization_details is valid. After user authentication, IdP show AA selection and asks the user for consent to grant the SP to query the selected AA.";
        this.validation = "self";
    }

    async exec() {
        const crt = fs.readFileSync(path.resolve(__dirname, '../config/spid-oidc-check-op-sig.crt'));
        const x5c = new x509.X509Certificate(crt);

        this.authrequest.client_id = config_rp.client_id;
        this.authrequest.response_type = "code";
        this.authrequest.scope = "openid";
        let pkce = pkceChallenge();
        this.authrequest.code_challenge = pkce.code_challenge;
        this.authrequest.code_verifier = pkce.code_verifier;
        this.authrequest.code_challenge_method = "S256";
        this.authrequest.nonce = Utility.getNonce();
        this.authrequest.prompt = "consent login";
        this.authrequest.redirect_uri = config_rp.redirect_uri;
        this.authrequest.acr_values = "https://www.spid.gov.it/SpidL1";
        this.authrequest.claims = {
            "userinfo": {
                "given_name": {"essential": true},
                "family_name": {"essential": true},
                "https://attributes.eid.gov.it/fiscal_number": {"essential": true}
            }
        }
        this.authrequest.state = Utility.getUUID();

        this.authrequest.authorization_details = [
            {
                "type": "https://spid.gov.it/attribute-authority/required-aa",
                "locations": [
                    "https://validator-test.spid.gov.it/oidc/op/attribute-authority"
                ]
            }
        ]; 


        const config_key = fs.readFileSync(path.resolve(__dirname, '../config/spid-oidc-check-op-sig.key'));
        const keystore = jose.JWK.createKeyStore();

        let key = await keystore.add(config_key, 'pem');
        let thumbprint = await key.thumbprint('SHA-256');

        let header = {
            kid: base64url.encode(thumbprint),
            x5c: [x5c.toString("base64")]
        }

        let iat = moment();
        let exp = iat.clone().add(15, 'm');

        let payload = JSON.stringify({ 
            jti: Utility.getUUID(),
            iss: this.authrequest.client_id,
            aud: this.metadata.configuration.issuer,
            iat: iat.unix(),
            exp: exp.unix(),
            client_id: this.authrequest.client_id,
            response_type: this.authrequest.response_type,
            scope: this.authrequest.scope,
            code_challenge: this.authrequest.code_challenge,
            code_challenge_method: this.authrequest.code_challenge_method,
            nonce: this.authrequest.nonce,
            prompt: this.authrequest.prompt,
            redirect_uri: this.authrequest.redirect_uri,
            acr_values: this.authrequest.acr_values,
            claims: this.authrequest.claims,
            state: this.authrequest.state,
            authorization_details: this.authrequest.authorization_details
        });

        this.authrequest.request = await jose.JWS.createSign({
            format: 'compact',
            alg: 'RS256',
            fields: {...header}
        }, key).update(payload).final();

        let authorization_endpoint = this.metadata.configuration.authorization_endpoint;
        this.authrequest.url = authorization_endpoint + 
            "?client_id=" + this.authrequest.client_id +
            "&response_type=" + this.authrequest.response_type +
            "&scope=" + this.authrequest.scope +
            "&request=" + this.authrequest.request; 

    }

}

module.exports = Test_7_0_0 
