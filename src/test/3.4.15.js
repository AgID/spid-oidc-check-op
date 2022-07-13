const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const axios = require('../server/node_modules/axios');
const jose = require('../server/node_modules/node-jose');

class Test_3_4_15 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.4.15";
        this.description = "Access Token Payload: the signature of access_token MUST be able to be verified with the public key of the OP";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();

        let access_token = this.tokenresponse.data.access_token;

        let op_jwks = (await axios.get(this.metadata.configuration.jwks_uri)).data;
        
        if(op_jwks.keys==null || op_jwks.keys=='') {
            this.notes = op_jwks;
            throw("JWKS of OP not found");
        }

        let keystore_op = jose.JWK.createKeyStore();
        for(let k in op_jwks) {
            await keystore_op.add(op_jwks[k], 'json');
        }
        
        let access_token_verified = await jose.JWS.createVerify(keystore_op).verify(access_token);

        this.notes = access_token_verified; 
        return true;
    }

}

module.exports = Test_3_4_15