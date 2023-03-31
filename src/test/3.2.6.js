const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require('../server/node_modules/validator');
const axios = require('../server/node_modules/axios');
const jose = require('../server/node_modules/node-jose');

class Test_3_2_6 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.6";
        this.description = "the signature of access_token MUST be valid, the signature of access_token MUST be able to be verified with the public key of the OP";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();

        let access_token = this.tokenresponse.data.access_token;

        if(!validator.isJWT(access_token)) {
            this.notes = access_token;
            throw("The value of access_token is not a valid JWT");
        }

        // I Relying Party (RP) devono usare jwks o signed_jwks_uri (Avv. SPID n.41 v.2)
        
        if(!this.metadata.configuration.jwks
            && !this.metadata.configuration.signed_jwks_uri
        ) {
            this.notes = this.metadata.configuration;
            throw("neither jwks or signed_jwks_uri is present");
        }

        let op_jwks = this.metadata.configuration.jwks;

        if(!op_jwks) {
            //let op_signed_jwks = (await axios.get(this.metadata.configuration.signed_jwks_uri)).data;
            this.notes = "signed_jwks_uri is not yet implemented. Please refer to AgID.";
            throw("OP uses signed_jwks_uri");
        }
        

        if(op_jwks.keys==null || op_jwks.keys=='') {
            this.notes = op_jwks;
            throw("JWKS of OP not found");
        }

        let keystore_op = jose.JWK.createKeyStore();
        for(let k in op_jwks.keys) {
            await keystore_op.add(op_jwks.keys[k]);
        }

        let access_token_verified = await jose.JWS.createVerify(keystore_op).verify(access_token);

        this.notes = access_token; 
        return true;
    }

}

module.exports = Test_3_2_6