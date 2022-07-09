const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');

class Test_2_4_0 extends TestAuthResponse {

    constructor(metadata, authrequest, authresponse) {
        super(metadata, authrequest, authresponse);
        this.num = "2.4.0";
        this.description = "parameter code MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(this.authresponse.code==null || this.authresponse=='') {
            throw("Parameter code is not present");
        } else {
            this.notes = this.authresponse.code;
            return true;
        }
    }

}

module.exports = Test_2_4_0 