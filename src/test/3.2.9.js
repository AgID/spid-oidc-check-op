const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_9 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.9";
        this.description = "if authentication request was for 'offline_access', parameter refresh_token MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.authrequest.scope.includes('offline_access')) {
            if(!this.tokenresponse.data.refresh_token) {
                this.notes = this.tokenresponse.data;
                throw("authentication request scope was for offline_access but parameter refresh_token is not present");
            } else {
                this.notes = this.tokenresponse.data.token_type;
                return true;
            }
        } else {
            this.notes = "authentication request scope was not for offline_access";
            return true;
        }
    }

}

module.exports = Test_3_2_9