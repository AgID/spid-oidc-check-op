const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_5_3_1 extends TestIntrospectionResponse {
    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse,
        refreshtokenrequest, refreshtokenresponse, userinforequest, userinforesponse,
        introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse,
            refreshtokenrequest, refreshtokenresponse, userinforequest, userinforesponse,
            introspectionrequest, introspectionresponse);
        this.num = "5.3.1";
        this.description = "Error response MUST have HTTP Status Code 200 OK";
        this.validation = "automatic";
    }
    async exec() {
        super.exec();
        if(this.introspectionresponse.status!=200) {
            this.notes = this.introspectionresponse.status;
            throw("HTTP Status Code is different from 200 OK");
        }

        this.notes = this.introspectionresponse.status;
        return true;
    }
}
module.exports = Test_5_3_1