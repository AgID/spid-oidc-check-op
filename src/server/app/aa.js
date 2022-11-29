const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const moment = require('moment');
const jose = require('node-jose');
const x509 = require("@peculiar/x509");
const base64url = require('base64url');
const validator = require('validator');
const Utility = require('../lib/utils');
const config_server = require("../../config/server.json");
const config_aa = require("../../config/aa.json");

 
module.exports = function(app, checkAuthorisation, database) {

    app.get("//attribute-authority", function(req, res) {
        res.redirect(config_aa.iss + '/apidoc');
    });

    app.get("//attribute-authority/openapi", function(req, res) {

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

                        "summary": "Ultima validazione",

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

    app.get("//attribute-authority/apidoc", function(req, res) {
        res.sendFile(path.join(__dirname, 'aa.html'));
    });

    app.get("//attribute-authority/.well-known/openid-federation", async function(req, res) {

        const crt = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op-sig.crt'));
        const x5c = new x509.X509Certificate(crt);

        const config_key = fs.readFileSync(path.resolve(__dirname, '../../config/spid-oidc-check-op-sig.key'));
        const keystore = jose.JWK.createKeyStore();

        let key = await keystore.add(config_key, 'pem');
        let thumbprint = await key.thumbprint('SHA-256');

        let header = {
            kid: base64url.encode(thumbprint),
            x5c: [x5c.toString("base64")]
        }

        let iat = moment();
        let exp = iat.clone().add(1, 'M');
        let iss = config_aa.iss;
        let jwks = await makeJwks();

        let payload = JSON.stringify({ 
            jti: Utility.getUUID(),
            iss: iss,
            sub: iss,
            iat: iat.unix(),
            exp: exp.unix(),
            jwks: jwks,
            trust_marks: [],
            authority_hints: ['registry.spid.gov.it'],
            metadata: {
                oauth_authorization_server: {
                    issuer: iss,
                    token_endpoint: config_aa.iss + '/token',
                    jwks: jwks
                },
                oauth_resource: {
                    logo_uri: config_server['host'] + "/img/logo2.svg",
                    resource: config_aa.iss + '/v1/validation'
                },
                federation_entity: {
                    homepage_uri: config_aa.iss,
                    organization_name: "SPID OIDC Validator Attribute Authority",                    
                }
            }
        });

        let entity_configuration = await jose.JWS.createSign({
            format: 'compact',
            alg: 'RS256',
            fields: {...header}
        }, key).update(payload).final();



        res.set("Content-Type", "application/jwt");
        res.status(200).send(entity_configuration);
    });


    /* TODO: implement attribute authority protected token exchange */
    app.get("//attribute-authority/token", function(req, res) {
        res.status(401).send("Unavailable");
    });

    /* TODO: implement attribute authority resource endpoint */
    app.get("//attribute-authority/v1/validation", function(req, res) {
        res.status(401).send("Unavailable");
    });





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

        return jwks;
    } 
}