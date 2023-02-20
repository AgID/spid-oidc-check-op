const TestRevocationResponse = require('../server/lib/test/TestIntrospectionResponse.js');

class Test_6_3_0 extends TestRevocationResponse {
    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse,
        refreshtokenrequest, refreshtokenresponse, userinforequest, userinforesponse,
        introspectionrequest, introspectionresponse, revocationrequest, revocationresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse,
            refreshtokenrequest, refreshtokenresponse, userinforequest, userinforesponse,
            introspectionrequest, introspectionresponse, revocationrequest, revocationresponse);
        this.num = "6.3.0";
        this.description = "the HTTP error Status Code CAN be 405";
        this.validation = "automatic";
    }
    async exec() {
        super.exec();
        this.notes = this.revocationresponse.status;
        return true;
    }
}
module.exports = Test_6_3_0