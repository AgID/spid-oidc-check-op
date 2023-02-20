const TestRevocationResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_6_2_0 extends TestRevocationResponse {
    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse,
        refreshtokenrequest, refreshtokenresponse, userinforequest, userinforesponse,
        introspectionrequest, introspectionresponse, revocationrequest, revocationresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse,
            refreshtokenrequest, refreshtokenresponse, userinforequest, userinforesponse,
            introspectionrequest, introspectionresponse, revocationrequest, revocationresponse);
        this.num = "6.2.0";
        this.description = "response MUST have HTTP Status Code 200 OK";
        this.validation = "automatic";
    }
    async exec() {
        super.exec();
        if(this.revocationresponse.status!=200) {
            this.notes = this.revocationresponse.status;
            throw("HTTP Status Code is different from 200 OK");
        }

        this.notes = this.revocationresponse.status;
        return true;
    }
}
module.exports = Test_6_2_0