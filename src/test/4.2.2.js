const TestUserinfoResponse = require('../server/lib/test/TestUserinfoResponse.js');
const validator = require('../server/node_modules/validator');

class Test_4_2_2 extends TestUserinfoResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse);
        this.num = "4.2.2";
        this.description = "the content of body MUST be a valid JWT";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(typeof(this.userinforesponse.data)!='string') {
            this.notes = this.userinforesponse.data;
            throw("the content of body MUST is not a valid JWT string");
        }
        
        if(!validator.isJWT(this.userinforesponse.data)) {
            this.notes = this.userinforesponse.data;
            throw("the content of body is not a valid JWT");
        }

        this.notes = this.userinforesponse.data;
        return true;
    }

}

module.exports = Test_4_2_2