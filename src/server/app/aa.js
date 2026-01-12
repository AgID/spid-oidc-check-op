const fs = require('fs-extra');
const path = require('path');
const axios = require('axios').default;
const moment = require('moment');
const jose = require('node-jose');
const jwt_decode = require('jwt-decode');
const x509 = require("@peculiar/x509");
const base64url = require('base64url');
const validator = require('validator');
const Utility = require('../lib/utils');
const Database = require("../lib/database");
const config_server = require("../../config/server.json");
const config_aa = require("../../config/aa.json");

 
module.exports = function(app, checkAuthorisation, database) {

    app.get("/attribute-authority", function(req, res) {
        res.redirect(config_aa.iss + '/apidoc');
    });

    app.get("/attribute-authority/apidoc", function(req, res) {
        res.sendFile(path.join(__dirname, 'aa.html'));
    });

    app.get("/attribute-authority/openapi", function(req, res) {

        let openapi = {
            "openapi": "3.0.3",
            "info": {
                "title": "SPID OIDC Validator Attribute Authority",
                "version": "1.0",

                "description": "L'API \"<i>SPID OIDC Validator Attribute Authority</i>\" consente di recuperare l'attributo qualificato, inteso come token JWT, contenente le informazioni relative all'ultima validazione eseguita dall'utente SPID, riconosciuto tramite indirizzo email, sul Validatore OIDC.<br/><br/> Tale API viene utilizzata dal Validatore OIDC al fine di verificare l'implementazione OIDC degli OpenID Provider SPID in relazione al flusso Protected descritto nelle <a href=\"https://www.agid.gov.it/it/piattaforme/spid/gestori-attributi-qualificati\">Linee Guida Attribute Authority SPID</a>.<br/><br/>Lo stesso <a href=\"" + config_server['host'] + '/api/attribute-authority/openapi' + "\">documento OpenAPI</a>  sulla base del quale è generata automaticamente la presente documentazione, è realizzato secondo le indicazioni contenute nelle <a href=\"https://www.agid.gov.it/it/piattaforme/spid/gestori-attributi-qualificati\">Linee Guida Attribute Authority SPID</a>.",
              
                "contact": {
                    "name": "SPID Tech",
                    "email": "spid.tech@agid.gov.it",
                    "url": config_aa.iss,
                },

                "x-logo": {
                    "url": config_server['host'] + "/img/logo2.png",
                    "altText": "SPID logo"
                },

                "x-spid": {
                    "aa-version": "1.0.0",
                    "aa-home": config_aa.iss + '/openapi',
                    "aa-registry": "https://registry.spid.gov.it/attribute-authority",
                    "aa-required-attributes": ['https://attributes.eid.gov.it/fiscal_number', 'email'],
                    "aa-lookup-attribute": "email"
                }
            },

            "servers": [
                {
                    "url": config_aa.iss + '/v1',
                    "description": "Server Attribute Authority Validator"
                }
            ],

            "paths": {
                "/validation": {
                    "get": {
                        "operationId": "get_validation",

                        "summary": "/validation",

                        "description": "Recupera l'ultima validazione effettuata dall'utente sul Validator OIDC.<br/> \
                                        L'accesso al dato è consentito in modalità Protected con i seguenti requisiti: <ul> \
                                        <li>è richiesta la raccolta dell'assenso dell'utente da parte dell'IdP</li> \
                                        <li>è richiesta un'autenticazione SPID almeno al livello SpidL2</li> \
                                        <li>non sono consentite richieste continuative</li>",

                        "tags": ["Protected"],

                        "security": [
                            {"Bearer Authentication": []}
                        ],

                        "x-spid-operation": {
                            "consentRequired": true,
                            "spidLevel": "https://www.spid.gov.it/SpidL2",
                            "offlineAccessExpiresIn": 0
                        },

                        "responses": {
                            "200": {
                                "description": "Ultima validazione eseguita",
                                "content": {
                                    "application/jwt": {
                                        "schema": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "400": { "$ref": "#/components/errors/400" },
                            "401": { "$ref": "#/components/errors/401" }
                        }
                    }
                }
            },

            "tags": [
                /*
                {
                    "name": "Public",
                    "description": "Accesso pubblico",
                    "externalDocs": {
                        "url": "https://www.agid.gov.it/it/piattaforme/spid/gestori-attributi-qualificati",
                        "description": "Linee Guida Attribute Authority SPID"
                    }
                },
                */
                {
                    "name": "Protected",
                    "description": "Accesso riservato a SP convenzionati, previa acquisizione dell'assenso dell'utente da parte dell'IdP per le AA",
                    "externalDocs": {
                        "url": "https://www.agid.gov.it/it/piattaforme/spid/gestori-attributi-qualificati",
                        "description": "Linee Guida Attribute Authority SPID"
                    }
                },
                /*
                {
                    "name": "Private",
                    "description": "Accesso previa acquisizione dell'assenso dell'utente da parte dell'AA",
                    "externalDocs": {
                        "url": "https://www.agid.gov.it/it/piattaforme/spid/gestori-attributi-qualificati",
                        "description": "Linee Guida Attribute Authority SPID"
                    }
                }
                */
            ],

            "components": {
                "schemas": {
                    "Error": {
                        "type": "object",
                        "properties": {
                            "status": {
                                "description": "HTTP Status Code",
                                "type": "integer",
                                "required": true
                            },
                            "type": {
                                "description": "URI to specific error code",
                                "type": "string",
                                "format": "uri",
                                "required": false
                            },
                            "title": {
                                "description": "Error Description",
                                "type": "string",
                                "required": true
                            },
                            "detail": {
                                "description": "Error Message",
                                "type": "string",
                                "required": false
                            }
                        }
                    }
                },

                "errors": {
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/problem+json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "application/problem+json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Forbidden",
                        "content": {
                            "application/problem+json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "application/problem+json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/problem+json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    "406": {
                        "description": "Not Acceptable",
                        "content": {
                            "application/problem+json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/problem+json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                },
                "securitySchemes": {
                    "Bearer Authentication": { 
                        "description": "JWT Token Bearer Authentication",
                        "type": "http",
                        "scheme": "Bearer",
                        "bearerFormat": "JWT"
                    }
                }
            }
        }
        

        res.status(200).json(openapi);
    });

    app.get("/attribute-authority/.well-known/openid-federation", async function(req, res) {

        const crt = fs.readFileSync(path.resolve(__dirname, '../../config/attribute-authority-sig.crt'));
        const x5c = new x509.X509Certificate(crt);

        const config_key = fs.readFileSync(path.resolve(__dirname, '../../config/attribute-authority-sig.key'));
        const keystore = jose.JWK.createKeyStore();

        let key = await keystore.add(config_key, 'pem');
        let thumbprint = await key.thumbprint('SHA-256');

        let header = {
            typ: 'entity-statement+jwt',
            kid: base64url.encode(thumbprint),
            x5c: [x5c.toString("base64")]
        }

        let iat = moment();
        let exp = iat.clone().add(1, 'M');
        let iss = config_aa.iss;
        let jwks = await makeAAJwks();

        let payload = { 
            jti: Utility.getUUID(),
            iss: iss,
            sub: iss,
            iat: iat.unix(),
            exp: exp.unix(),
            jwks: jwks,
            trust_marks: config_aa.trust_marks,
            authority_hints: config_aa.authority_hints,
            metadata: config_aa.metadata
        };

        payload["metadata"]["oauth_authorization_server"]["jwks"] = jwks;

        payload = JSON.stringify(payload);

        let entity_configuration = await jose.JWS.createSign({
            format: 'compact',
            alg: 'RS256',
            fields: {...header}
        }, key).update(payload).final();



        res.set("Content-Type", "application/entity-statement+jwt");
        res.status(200).send(entity_configuration);
    });


    /*
     * Security Token Service Endpoint
     * Attribute Authority Protected Token Exchange 
     */
    app.post("/attribute-authority/token", async function(req, res) {
        let grant_type = req.body.grant_type;
        let resource = req.body.resource;
        let scope = req.body.scope;
        let requested_token_type = req.body.requested_token_type;
        let subject_token = req.body.subject_token;
        let subject_token_type = req.body.subject_token_type;
        let client_assertion = req.body.client_assertion;
        let client_assertion_type = req.body.client_assertion_type;

        if(grant_type==null || grant_type=='') return error(res, 400,"invalid_request", "Parameter grant_type is missing");
        if(requested_token_type==null || requested_token_type=='') return error(res, 400,"invalid_request", "Parameter requested_token_type is missing");
        if(subject_token==null || subject_token=='') return error(res, 400,"invalid_request", "Parameter subject_token is missing");
        if(subject_token_type==null || subject_token_type=='') return error(res, 400,"invalid_request", "Parameter subject_token_type is missing");
        if(client_assertion==null || client_assertion=='') return error(res, 400,"invalid_request", "Parameter client_assertion is missing");
        if(client_assertion_type==null || client_assertion_type=='') return error(res, 400,"invalid_request", "Parameter client_assertion_type is missing");

        if(grant_type!='urn:ietf:params:oauth:grant-type:token-exchange') return error(res, 400,"invalid_request", "Parameter grant_type is not 'urn:ietf:params:oauth:grant-type:token-exchange'");
        if(requested_token_type!='urn:ietf:params:oauth:token-type:access_token') return error(res, 400,"invalid_request", "Parameter requested_token_type is not 'urn:ietf:params:oauth:token-type:access_token'");
        if(subject_token_type!='https://spid.gov.it/attribute-authority/grant-token') return error(res, 400,"invalid_request", "Parameter subject_token_type is not 'https://spid.gov.it/attribute-authority/grant-token'");
        if(client_assertion_type!='urn:ietf:params:oauth:client-assertion-type:jwt-bearer') return error(res, 400,"invalid_request", "Parameter client_assertion_type is not 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'");
        if(resource!=null && resource!=config_aa.iss + '/validation') return error(res, 400,"invalid_request", "resource not recognized. Valid resource is '" + config_aa.iss + "/validation'");
        if(scope!=null && scope!='' && !(scope.split(' ').includes('get_validation'))) return error(res, 400,"invalid_request", "scope not recognized. Valid scope is 'get_validation'");

        try {
            //await checkAssertion(client_assertion);
            let grant_token = await checkGrantToken(subject_token);
            if(grant_token.aud!=config_aa.iss) return error(res, 400,"invalid_request", "grant token aud is not '" + config_aa.iss + "'");
            if(moment().isBefore(moment(grant_token.exp))) return error(res, 400,"invalid_request", "grant token is expired");

            // all is ok, let's create the access_token
            let access_token = await makeAccessToken(grant_token);
            res.status(200).send(access_token);

        } catch(e) {
            error(res, 400, "invalid_request", e.toString());
        }
    });

    app.get("/attribute-authority/validation", async function(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            if(authHeader==null || authHeader=='') return error(res, 401, 'Unauthorized');

            const bearer_token = authHeader && authHeader.split(' ')[1]; 
            let access_token = await checkAccessToken(bearer_token);

            if(access_token.iss!=config_aa.iss) return error(res, 400,"invalid_request", "access token iss is not '" + config_aa.iss + "'");
            if(access_token.aud!=config_aa.iss) return error(res, 400,"invalid_request", "access token aud is not '" + config_aa.iss + "'");
            if(moment().isBefore(moment(access_token.exp))) return error(res, 400, "invalid_request", "access token is expired");
            if(access_token.sub==null || access_token.sub=='') return error(res, 400,"invalid_request", "grant token does not cointain sub claim");

            let store_type = req.query.store_type || 'test'; 

            let database = new Database().connect().setup();
            let store = database.getStore(access_token.sub, store_type);
            
            res.status(200).send(store);

        } catch(e) {
            error(res, 400, "invalid_request", e.toString());
        }
    });



    function error(res, status, error, error_description) {
        res.status(status).send({
            error,
            error_description
        });
    }

    async function makeRPJwks() {
        const crt_sig = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op-sig.crt'));
        const crt_enc = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op-enc.crt'));
        return makeJwks(crt_sig, crt_enc);
    }

    async function makeAAJwks() {
        const crt_sig = fs.readFileSync(path.resolve(__dirname, '../../config/attribute-authority-sig.crt'));
        const crt_enc = fs.readFileSync(path.resolve(__dirname, '../../config/attribute-authority-enc.crt'));
        return makeJwks(crt_sig, crt_enc);
    }

    async function makeJwks(crt_sig, crt_enc) {
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

        return jwks;
    } 

    async function checkAssertion(client_assertion) {
        if (!validator.isJWT(client_assertion)) {
            throw ('client_assertion is not a valid JWT');
        }
    
        // Relying Party is spid-oidc-check-op itself
        let jwks = await makeRPJwks();
    
        if (jwks.keys == null || jwks.keys == '') {
            throw ('Relying Party JWKS not found');
        }
    
        let keystore = jose.JWK.createKeyStore();
        for (let k in jwks.keys) {
            await keystore.add(jwks.keys[k]);
        }
    
        let jws = await jose.JWS.createVerify(keystore).verify(client_assertion);

        if (!jws) throw ('client_assertion not verifiable');

        return JSON.parse(jws.payload);
    }

    async function checkGrantToken(grant_token) {
        if(!Utility.isJWT(grant_token, true)) {
            throw("grant token is not a valid JWE");
        }

        // check if grant token can be decrypted with AA private key
        const config_prv_aa_key = fs.readFileSync(path.resolve(__dirname, '../../config/attribute-authority-enc.key'));
        const keystore = jose.JWK.createKeyStore();
        const prv_key = await keystore.add(config_prv_aa_key, 'pem');
        let jwe = await jose.JWE.createDecrypt(prv_key).decrypt(grant_token);

        let grantTokenInnerSignedToken = jwe.payload.toString();

        if(!Utility.isJWT(grantTokenInnerSignedToken)) {
            this.notes = grantTokenInnerSignedToken;
            throw("grant token JWE payload is not a valid JWS (Grant Token Inner Signed Token)");
        }

        // retrieve public key of openid provider that issued the grant token
        let op = jwt_decode(grantTokenInnerSignedToken).iss;
        let op_config = (await axios.get(op + "/.well-known/openid-federation")).data;
        let op_config_payload = jwt_decode(op_config);

        // assume that first key is good
        // TODO: check with every key on jwks
        let jwk = JSON.stringify(op_config_payload.jwks.keys[0]); 

        // check if grant token is signed by openid provider that issued it
        const pub_crt = await keystore.add(jwk, 'json');
        let jws = await jose.JWS.createVerify(pub_crt).verify(grantTokenInnerSignedToken);


        // Why this not works???
        /*
        let jwks = op_config_payload.jwks; 

        // check if grant token is signed by openid provider that issued it
        for (let k in jwks.keys) {
            let jwk = JSON.stringify(jwks.keys[k]); 
            await keystore.add(jwk, 'json');
        }

        let jws = await jose.JWS.createVerify(keystore).verify(grantTokenInnerSignedToken);
        */

        if(!jws) throw("grant token is not verified");

        return JSON.parse(jws.payload);
    }

    async function makeAccessToken(grant_token) {
        const config_key = fs.readFileSync(path.resolve(__dirname, "../../config/attribute-authority-sig.key"));
        const keystore = jose.JWK.createKeyStore();
        let key = await keystore.add(config_key, "pem");

        let header = {};

        let iat = moment();
        let exp = iat.clone().add(15, "m");

        let payload = JSON.stringify({
            jti: Utility.getUUID(),
            iss: config_aa.iss,
            aud: config_aa.iss,
            iat: iat.unix(),
            exp: exp.unix(),
            resource: config_aa.iss + '/validation',
            scope: "get_validation",
            sub: grant_token.sub
        });

        let access_token = await jose.JWS.createSign(
        {
            format: "compact",
            alg: "RS256",
            fields: { ...header },
        },
        key
        )
        .update(payload)
        .final();

        return access_token;
    }

    async function checkAccessToken(access_token) {
        if (!validator.isJWT(access_token)) {
            throw ('access_token is not a valid JWT');
        }
    
        let jwks = await makeAAJwks();
    
        if (jwks.keys == null || jwks.keys == '') {
            throw ('Attribute Authority JWKS not found');
        }

        let keystore = jose.JWK.createKeyStore();
        for (let k in jwks.keys) {
            await keystore.add(jwks.keys[k]);
        }

        let jws = await jose.JWS.createVerify(keystore).verify(access_token);

        if (!jws) throw ('access_token is not verified');

        return JSON.parse(jws.payload);
    }
}
