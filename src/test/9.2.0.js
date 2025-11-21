const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_9_2_0 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.0";
        this.description = "Introspection Response MUST have Content-Type 'application/json'";
        this.validation = "automatic";
    }

    exec() {
        super.exec();
        if(!this.introspectionresponse.headers['content-type'].includes('application/json')) {
            this.notes = this.introspectionresponse.headers['content-type'];
            throw("Content-Type is not 'application/json'");
        } else {
            this.notes = this.introspectionresponse.headers['content-type'];
            return true;
        }
    }

}

module.exports = Test_9_2_0