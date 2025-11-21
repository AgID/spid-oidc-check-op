const TestIntrospectionResponse = require('../server/lib/test/TestIntrospectionResponse.js');
const validator = require('../server/node_modules/validator');
const utility = require('../server/lib/utils');

class Test_9_2_6 extends TestIntrospectionResponse {

    constructor(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse) {
        super(metadata, authrequest, authresponse, tokenrequest, tokenresponse, userinforequest, userinforesponse, introspectionrequest, introspectionresponse);
        this.num = "9.2.6";
        this.description = "Introspection Response - if active=true, parameter exp MUST be present";
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

        if(this.introspectionresponse.data.active!=true && this.introspectionresponse.data.active!=false) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active is not true not false");
        }

        if(this.introspectionresponse.data.active==true && (this.introspectionresponse.data.exp==null || this.introspectionresponse.data.exp=='')) {
            this.notes = this.introspectionresponse.data;
            throw("the parameter active is true but parameter exp is not present");
        }

        this.notes = this.introspectionresponse.data.exp;
        return true;
    }

}

module.exports = Test_9_2_6