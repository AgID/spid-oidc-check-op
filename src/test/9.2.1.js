const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_9_2_1 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.1";
        this.description = "Introspection Response MUST have HTTP Status Code 200 OK";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        
        if(this.introspectionresponse.status!=200) {
            this.notes = this.introspectionresponse.status;
            throw("HTTP Status Code is different from 200 OK");
        }

        this.notes = this.introspectionresponse.status;
        return true;
    }

}

module.exports = Test_9_2_1