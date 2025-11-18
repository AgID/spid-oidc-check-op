const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_9_3_3 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.3.3";
        this.description = "Parameter error_description of the Introspection Error Response MUST be present";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(this.introspectionresponse.data.error_description==null || this.introspectionresponse.data.error_description=='') {
            this.notes = this.introspectionresponse.data;
            throw("Parameter error_description is not present");
        } else {
            this.notes = this.introspectionresponse.data;
            return true;
        }
    }

}

module.exports = Test_9_3_3