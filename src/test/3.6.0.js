const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_6_0 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.6.0";
        this.description = "Error Response MUST have Content-Type 'application/json'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.tokenresponse.headers['content-type'].includes('application/json')) {
            this.notes = this.tokenresponse.headers['content-type'];
            throw("Content-Type is not 'application/json'");
        } else {
            this.notes = this.tokenresponse.headers['content-type'];
            return true;
        }
    }

}

module.exports = Test_3_6_0