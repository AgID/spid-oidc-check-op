const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const validator = require('../server/node_modules/validator')

class Test_3_2_11 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.11";
        this.description = "the signature of refresh_token MUST be valid";
        this.validation = "self";
    }

    exec() {
        super.exec();
        if(this.authrequest.scope.includes('offline_access')) {
            if(!validator.isJWT(this.tokenresponse.data.refresh_token)) {
                this.notes = this.tokenresponse.data.refresh_token;
                throw("The value of refresh_token is not a valid JWT");
            } else {
                this.notes = "TODO";
                return true;
            }
        } else {
            this.notes = "authentication request scope was not for offline_access";
            return true;
        }
    }

}

module.exports = Test_3_2_11