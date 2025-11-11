const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');
const validator = require('../server/node_modules/validator');
const utility = require('../server/lib/utils');

class Test_9_2_2 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.2";
        this.description = "Introspection Response - the content of body MUST be a valid JSON";
        this.validation = "automatic";
    }

    exec() {
        super.exec();

        if(!(this.introspectionresponse.data===Object(this.introspectionresponse.data))) {
            this.notes = this.introspectionresponse.data;
            throw("the content of body is not a valid JSON object");
        }

        this.notes = this.introspectionresponse.data;
        return true;
    }

}

module.exports = Test_9_2_2