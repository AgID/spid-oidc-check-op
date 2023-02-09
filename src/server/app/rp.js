const fs = require("fs");
const path = require("path");
const x509 = require("@peculiar/x509");
const jose = require('node-jose');
const moment = require('moment');
const base64url = require('base64url');
const Utility = require("../lib/utils");
const config_server = require("../../config/server.json");
const config_rp = require("../../config/rp.json");
const config_dir = require("../../config/dir.json");


module.exports = function(app, checkAuthorisation) {

    // get metadata (OIDC CORE)
    app.get("//.well-known/openid-configuration", async function (req, res) {
        let metadata = await makeMetadata();
        res.status(200).json(metadata);
    }); 

    // get entity configuration (OIDC FEDERATION)
    app.get("//.well-known/openid-federation", async function (req, res) {
        let entity_statement = await makeEntityStatement();
        res.set('Content-Type', 'application/entity-statement+jwt');
        res.status(200).send(entity_statement);
    });

    // get certs
    app.get("//certs", async function (req, res) {
        let jwks = await makeJwks();
        res.status(200).json(jwks);
    }); 

    async function makeMetadata() {
        const client_id = config_rp.client_id;
        const redirect_uris = [ config_rp.redirect_uri ];
        const jwks_uri_host = (client_id.substring(-1)=='/')? client_id.substring(0, client_id.length-1) : client_id;
        const jwks_uri = jwks_uri_host + config_rp.basepath + "/certs";
        const jwks = await makeJwks();
        const response_types = ["code"];
        const grant_types = ["authorization_code", "refresh_token"];
        const client_name = "Agenzia per l'Italia Digitale";
        const organization_name = "Agenzia per l'Italia Digitale";

        return {
            client_id: client_id,
            redirect_uris: redirect_uris,
            jwks: jwks,
            jwks_uri: jwks_uri,
            response_types: response_types,
            grant_types: grant_types,
            client_name: client_name,
            organization_name: organization_name
        };
    }

    async function makeEntityStatement() {
        const config_key = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op-sig.key'));
        const keystore = jose.JWK.createKeyStore();
        
        const key = await keystore.add(config_key, 'pem');
        const thumbprint = await key.thumbprint('SHA-256');

        const header = {
            kid: base64url.encode(thumbprint),
            //x5c: [x5c.toString("base64")]
        }

        const iat = moment();
        const exp = iat.clone().add(1, 'years')

        const payload = JSON.stringify({ 
            iss: config_rp.client_id,
            sub: config_rp.client_id,
            iat: iat.unix(),
            exp: exp.unix(),
            jwks: await makeJwks(),
            metadata: {
                "federation_entity": {
                    "homepage_uri": "https://" + config_rp.client_id,
                    "policy_uri": "https://" + config_rp.client_id + "/policy",
                    "logo_uri": "https://" + config_rp.client_id + "/logo",
                    "contacts": "spid.tech@agid.gov.it",
                    "federation_resolve_endpoint": null
                },
                "openid_relying_party": await makeMetadata(),
            },
            authority_hints: [
                "https://registry.spid.gov.it"
            ],
            trust_marks: [
    
            ]
        });

        const entity_statement = await jose.JWS.createSign({
            format: 'compact',
            alg: 'RS256',
            fields: {...header}
        }, key).update(payload).final();

        return entity_statement;
    }

    async function makeJwks() {
        const crt_sig = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op-sig.crt'));
        const crt_enc = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op-enc.crt'));
        const x5c_sig = new x509.X509Certificate(crt_sig);
        const x5c_enc = new x509.X509Certificate(crt_enc);
        const keystore = jose.JWK.createKeyStore();

        let jwk_sig = await jose.JWK.asKey(crt_sig, 'pem');
        let jwk_enc = await jose.JWK.asKey(crt_enc, 'pem');

        let thumb_sig = await jwk_sig.thumbprint('SHA-256');
        let thumb_enc = await jwk_enc.thumbprint('SHA-256');

        var props_sig = {
            kid: base64url.encode(thumb_sig),
            alg: 'RS256',
            use: 'sig',
            x5c: [x5c_sig.toString("base64")]
        };

        var props_enc = {
            kid: base64url.encode(thumb_enc),
            alg: 'RSA-OAEP-256',
            use: 'enc',
            x5c: [x5c_enc.toString("base64")]
        };

        await keystore.add(crt_sig, 'pem', props_sig),
        await keystore.add(crt_enc, 'pem', props_enc);

        const jwks = keystore.toJSON(false);
        console.log(jwks);

        return jwks;
    }
}