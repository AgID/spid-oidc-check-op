const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');

class Test_4_2_0 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.2.0";
        this.description = "response MUST have Content-Type 'application/jwt'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(!this.userinforesponse.headers['content-type'].includes('application/jwt')) {
            this.notes = this.userinforesponse.headers['content-type'];
            throw("Content-Type is not 'application/jwt'");
        } else {
            this.notes = this.userinforesponse.headers['content-type'];
            return true;
        }
    }

}

module.exports = Test_4_2_0 