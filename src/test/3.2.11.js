const TestRefreshTokenResponse = require('../server/lib/test/TestRefreshTokenResponse.js');
const jwt_decode = require("../server/node_modules/jwt-decode");
const validator = require('../server/node_modules/validator');
const axios = require('../server/node_modules/axios').default;
const jose = require('../server/node_modules/node-jose');

class Test_3_2_11 extends TestRefreshTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, refreshtokenrequest, refreshtokenresponse);
        this.num = "3.2.11";
        this.description = "the signature of refresh_token MUST be valid, the signature of refresh_token MUST be able to be verified with the public key of the OP";
        this.validation = "automatic";
    }

    async exec() {
        super.exec();

        if(!this.authrequest.scope.includes('offline_access')) {
            this.notes = this.authrequest.scope;
            throw("The authrequest scope not contains offline_access");
        }

        let refresh_token = this.refreshtokenresponse.data.refresh_token;

        try {
            if(!validator.isJWT(refresh_token)) {
                this.notes = refresh_token;
                throw("The value of refresh_token is not a valid JWT");
            }
        } catch(exception) {
            this.notes = refresh_token;
            throw("The value of refresh_token is not a valid JWT");
        }

        // DEPRECATED BY SPID Notice n. 41 v.2 
        //let op_jwks = (await axios.get(this.metadata.configuration.jwks_uri)).data;

        if(this.metadata.configuration.signed_jwks_uri==null && this.metadata.configuration.jwks==null) {
            this.notes = this.metadata.configuration;
            throw("The metadata MUST contain jwks or signed_jwks_uri (SPID Notice n.41 v.2)");
        }

        let op_jwks;

        // prefer signed_jwks_uri
        if(this.metadata.configuration.signed_jwks_uri==null) {
            op_jwks = this.metadata.configuration.jwks;
        } else {
            op_jwks = (await axios.get(this.metadata.configuration.signed_jwks_uri)).data;
        }
        
        if(op_jwks.keys==null || op_jwks.keys=='') {
            this.notes = op_jwks;
            throw("JWKS of OP not found");
        }

        let keystore_op = jose.JWK.createKeyStore();
        for(let k in op_jwks.keys) {
            await keystore_op.add(op_jwks.keys[k]);
        }
        
        let refresh_token_verified = await jose.JWS.createVerify(keystore_op).verify(refresh_token);

        this.notes = refresh_token; 
        return true;
    }

}
 
module.exports = Test_3_2_11
