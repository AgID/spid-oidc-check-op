const fs = require("fs");
const path = require("path");
const jose = require('node-jose');
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
        let response_types = "code";
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
    app.get("//certs", function (req, res) {

        const crt = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op.crt'));
        const keystore = jose.JWK.createKeyStore();

        keystore
        .add(crt, 'pem')
        .then(function(_) {
            const jwks = keystore.toJSON(false);
            console.log(jwks);
            res.status(200).json(jwks);
        });
    }); 
}