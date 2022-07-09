const TestAuthResponse = require('../server/lib/test/TestAuthResponse.js');
const validator = require('../server/node_modules/validator');

class Test_2_4_1 extends TestAuthResponse {

    constructor(metadata, authrequest, authresponse) {
        super(metadata, authrequest, authresponse);
        this.num = "2.4.1";
        this.description = "the value of code MUST be UUID";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!validator.isUUID(this.authresponse.code)) {
            this.notes = this.authresponse.code;
            throw("The value of code is not UUID");
        } else {
            this.notes = this.authresponse.code;
            return true;
        }
    }

}

module.exports = Test_2_4_1 