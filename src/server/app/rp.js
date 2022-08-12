const fs = require("fs");
const path = require("path");
const x509 = require("@peculiar/x509");
const jose = require('node-jose');
const base64url = require('base64url');
const Utility = require("../lib/utils");
const config_server = require("../../config/server.json");
const config_rp = require("../../config/rp.json");
const config_dir = require("../../config/dir.json");


module.exports = function(app, checkAuthorisation) {

    // get metadata
    app.get("//.well-known/openid-configuration", function (req, res) {

        let client_id = config_rp.client_id;
        let redirect_uris = [ config_rp.redirect_uri ];
        let jwks_uri_host = (client_id.substring(-1)=='/')? client_id.substring(0, client_id.length-1) : client_id;
        let jwks_uri = jwks_uri_host + config_rp.basepath + "/certs";
        let response_types = ["code"];
        let grant_types = ["authorization_code", "refresh_token"];
        let client_name = "Agenzia per l'Italia Digitale";

        res.status(200).json({
            client_id: client_id,
            redirect_uris: redirect_uris,
            jwks_uri: jwks_uri,
            response_types: response_types,
            grant_types: grant_types,
            client_name: client_name 
        })
    }); 

    // get certs
    app.get("//certs", async function (req, res) {

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
        res.status(200).json(jwks);
    }); 
}