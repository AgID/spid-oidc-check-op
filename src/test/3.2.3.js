const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_3 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.3";
        this.description = "response MUST have HTTP response header Pragma with value 'no-cache'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.tokenresponse.headers['pragma']!='no-cache') {
            this.notes = this.tokenresponse.headers;
            throw("pragma value is not 'no-cache'");
        } else {
            this.notes = this.tokenresponse.headers['pragma'];
            return true;
        }
    }

}

module.exports = Test_3_2_3