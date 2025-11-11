const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_9_4_0 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.4.0";
        this.description = "Introspection Response MUST have active=true";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(!(this.introspectionresponse.data===Object(this.introspectionresponse.data))) {
            this.notes = this.introspectionresponse.data;
            throw("the content of body is not a valid JSON object");
        }

        if(this.introspectionresponse.data.active==null) {
            this.notes = this.introspectionresponse.data;
            throw("the content of body does not contain parameter active");
        }

        if(this.introspectionresponse.data.active!=true) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active MUST be true");
        }

        this.notes = this.introspectionresponse.data;
        return true;        
    }

}

module.exports = Test_9_4_0