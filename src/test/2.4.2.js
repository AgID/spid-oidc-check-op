const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');

class Test_2_4_2 extends TestAuthResponse {

    constructor(metadata, authrequest, authresponse) {
        super(metadata, authrequest, authresponse);
        this.num = "2.4.2";
        this.description = "parameter state MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.authresponse.state) {
            this.notes = this.authresponse.state;
            throw("Parameter state is not present");
        } else {
            this.notes = this.authresponse.state;
            return true;
        }
    }

}

module.exports = Test_2_4_2