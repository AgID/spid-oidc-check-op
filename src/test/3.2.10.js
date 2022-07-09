const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');
const validator = require('../server/node_modules/validator')

class Test_3_2_10 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.10";
        this.description = "the value of refresh_token MUST be a valid JWT";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.authrequest.scope.includes('offline_access')) {
            if(!validator.isJWT(this.tokenresponse.data.refresh_token)) {
                this.notes = this.tokenresponse.data.refresh_token;
                throw("The value of refresh_token is not a valid JWT");
            } else {
                this.notes = this.tokenresponse.data.refresh_token;
                return true;
            }
        } else {
            this.notes = "authentication request scope was not for offline_access";
            return true;
        }
    }

}

module.exports = Test_3_2_10