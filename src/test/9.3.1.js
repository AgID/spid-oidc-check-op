const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_9_3_1 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.3.1";
        this.description = "the HTTP Status Code of Introspection Response MUST be one of [401, 405]";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(![401, 405].includes(this.introspectionresponse.status)) {
            this.notes = this.introspectionresponse.status;
            throw("HTTP Status Code is not one of [401, 405]");
        } else {
            this.notes = this.introspectionresponse.status;
            return true;
        }
    }

}

module.exports = Test_9_3_1