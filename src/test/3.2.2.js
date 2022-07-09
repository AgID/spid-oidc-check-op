const TestTokenResponse = require('../server/lib/test/TestTokenResponse.js');

class Test_3_2_2 extends TestTokenResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse);
        this.num = "3.2.2";
        this.description = "response MUST have HTTP response header Cache-Control with value 'no-store'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.tokenresponse.headers['cache-control']!='no-store') {
            this.notes = this.tokenresponse.headers;
            throw("cache-control is not 'no-store'");
        } else {
            this.notes = this.tokenresponse.headers['cache-control'];
            return true;
        }
    }

}

module.exports = Test_3_2_2