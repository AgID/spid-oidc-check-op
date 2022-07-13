const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');

class Test_4_2_1 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.2.1";
        this.description = "response MUST have HTTP Status Code 200 OK";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        
        if(this.userinforesponse.status!=200) {
            this.notes = this.userinforesponse.status;
            throw("HTTP Status Code is different from 200 OK");
        }

        this.notes = this.userinforesponse.status;
        return true;
    }

}

module.exports = Test_4_2_1