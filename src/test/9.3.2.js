const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_9_3_2 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.3.2";
        this.description = "Parameter error of the Introspection Error Response MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(this.introspectionresponse.data.error==null || this.introspectionresponse.data.error=='') {
            this.notes = this.introspectionresponse.data;
            throw("Parameter error is not present");
        } else {
            this.notes = this.introspectionresponse.data;
            return true;
        }
    }

}

module.exports = Test_9_3_2