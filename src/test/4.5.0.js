const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');

class Test_4_5_0 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.5.0";
        this.description = "the HTTP Status Code MUST be one of [400, 401, 403, 405]";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        
        if(![400, 401, 403, 405].includes(this.userinforesponse.status)) {
            this.notes = this.userinforesponse.status;
            throw("HTTP Status Code is not one of [400, 401, 403, 405]");
        }

        this.notes = this.userinforesponse.status;
        return true;
    }

}

module.exports = Test_4_5_0